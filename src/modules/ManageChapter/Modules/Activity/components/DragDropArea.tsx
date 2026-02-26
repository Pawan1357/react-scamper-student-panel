import { useCallback, useEffect, useRef, useState } from 'react';

import { CloseCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import { IMAGE_URL } from 'utils/constants';
import { ImageTypeEnum } from 'utils/constants/enum';

import {
  DragDropBasesContainer,
  DragDropContainer,
  DragDropTarget,
  DraggableItem,
  DraggableItems,
  DroppedOptionItem,
  DroppedOptionsContainer,
  RemoveButton
} from '../ActivityView.styled';

interface DragDropAreaProps {
  targets?: any[];
  draggableItems?: any[];
  rows?: number;
  cols?: number;
  onSelectionsChange?: (selections: { [position: string]: any[] }) => void;
  isSubmitted?: boolean;
  questionId?: number;
  initialSelections?: { [position: string]: any[] };
  isViewMode?: boolean;
  correctPositions?: { [position: string]: any } | { [position: string]: any };
  noOfRows?: number;
  noOfColumns?: number;
}

export const DragDropArea = ({
  draggableItems,
  targets,
  onSelectionsChange,
  isSubmitted = false,
  questionId,
  initialSelections,
  isViewMode = false,
  noOfRows = 1,
  noOfColumns = 1
}: DragDropAreaProps) => {
  // Track which items are dropped in which base position (position -> items[])
  const [droppedItems, setDroppedItems] = useState<{ [position: string]: any[] }>(
    initialSelections || {}
  );
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [dragOverPosition, setDragOverPosition] = useState<string | null>(null);
  const [dragPreviewPosition, setDragPreviewPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  // Touch drag state (for tablet where HTML5 DnD doesn't fire)
  const TOUCH_DRAG_THRESHOLD = 10;
  const touchDragRef = useRef<{
    touchId: number;
    item: any;
    fromPosition: string | null;
    startX: number;
    startY: number;
    hasMoved: boolean;
  } | null>(null);
  const droppedItemsRef = useRef(droppedItems);
  const isSubmittedRef = useRef(isSubmitted);
  const isViewModeRef = useRef(isViewMode);
  droppedItemsRef.current = droppedItems;
  isSubmittedRef.current = isSubmitted;
  isViewModeRef.current = isViewMode;

  // Reset dropped items when question changes
  useEffect(() => {
    setDroppedItems(initialSelections || {});
    setDraggedItem(null);
    setDragOverPosition(null);
    setDragPreviewPosition(null);
    touchDragRef.current = null;
  }, [questionId, initialSelections]);

  // Check if item is already dropped (for visual feedback)
  const isItemDropped = useCallback(
    (itemId: number) => {
      return Object.values(droppedItems).some((items) =>
        items.some((item: any) => item?.id === itemId)
      );
    },
    [droppedItems]
  );

  // Handle drag start from draggable item (desktop only – tablet uses touch)
  const handleDragStart = useCallback(
    (e: React.DragEvent, item: any) => {
      if (isSubmitted || isViewMode) {
        e.preventDefault();
        return;
      }
      if (isItemDropped(item.id)) {
        e.preventDefault();
        return;
      }
      setDraggedItem(item);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('application/json', JSON.stringify(item));
    },
    [isSubmitted, isViewMode, isItemDropped]
  );

  // Handle drag over on drop zone
  const handleDragOver = useCallback(
    (e: React.DragEvent, position: string) => {
      if (isSubmitted || isViewMode) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setDragOverPosition(position);
    },
    [isSubmitted, isViewMode]
  );

  // Handle drag leave
  const handleDragLeave = useCallback(() => {
    setDragOverPosition(null);
  }, []);

  // Drop logic for tablet touch only (desktop uses handleDrop below)
  const applyDropForTouch = useCallback(
    (position: string, item: any) => {
      if (!item?.id || isSubmittedRef.current || isViewModeRef.current) return;
      setDroppedItems((prev) => {
        const newSelections = { ...prev };
        Object.keys(newSelections).forEach((pos) => {
          if (pos !== position && Array.isArray(newSelections[pos])) {
            newSelections[pos] = newSelections[pos].filter((i: any) => i.id !== item.id);
            if (newSelections[pos].length === 0) delete newSelections[pos];
          }
        });
        if (!newSelections[position]) newSelections[position] = [];
        const existingIndex = newSelections[position].findIndex((i: any) => i.id === item.id);
        if (existingIndex === -1) {
          newSelections[position] = [...newSelections[position], item];
        }
        if (onSelectionsChange) onSelectionsChange(newSelections);
        return newSelections;
      });
      setDraggedItem(null);
      setDragOverPosition(null);
      setDragPreviewPosition(null);
    },
    [onSelectionsChange]
  );

  // Handle drop on base (desktop mouse only – unchanged from original)
  const handleDrop = useCallback(
    (e: React.DragEvent, position: string) => {
      if (isSubmitted || isViewMode) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      e.stopPropagation();

      const item = draggedItem || JSON.parse(e.dataTransfer.getData('application/json') || '{}');

      if (item && item.id) {
        setDroppedItems((prev) => {
          const newSelections = { ...prev };

          Object.keys(newSelections).forEach((pos) => {
            if (pos !== position && Array.isArray(newSelections[pos])) {
              newSelections[pos] = newSelections[pos].filter((i: any) => i.id !== item.id);
              if (newSelections[pos].length === 0) {
                delete newSelections[pos];
              }
            }
          });

          if (!newSelections[position]) {
            newSelections[position] = [];
          }

          const existingIndex = newSelections[position].findIndex((i: any) => i.id === item.id);

          if (existingIndex === -1) {
            newSelections[position] = [...newSelections[position], item];
          }

          if (onSelectionsChange) {
            onSelectionsChange(newSelections);
          }
          return newSelections;
        });
      }

      setDraggedItem(null);
      setDragOverPosition(null);
    },
    [draggedItem, isSubmitted, isViewMode, onSelectionsChange]
  );

  // Handle removing item from base
  const handleRemoveFromBase = useCallback(
    (position: string, itemId: number) => {
      if (isSubmitted || isViewMode) return;
      setDroppedItems((prev) => {
        const newSelections = { ...prev };
        if (newSelections[position]) {
          newSelections[position] = newSelections[position].filter(
            (item: any) => item.id !== itemId
          );
          // Remove position key if empty
          if (newSelections[position].length === 0) {
            delete newSelections[position];
          }
        }
        if (onSelectionsChange) {
          onSelectionsChange(newSelections);
        }
        return newSelections;
      });
    },
    [isSubmitted, isViewMode, onSelectionsChange]
  );

  // Handle drag start from dropped item in base (desktop only)
  const handleDragStartFromBase = useCallback(
    (e: React.DragEvent, item: any, position: string) => {
      if (isSubmitted || isViewMode) {
        e.preventDefault();
        return;
      }
      setDraggedItem(item);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('application/json', JSON.stringify(item));
      e.dataTransfer.setData('position', position);
    },
    [isSubmitted, isViewMode]
  );

  // Touch handlers for tablet
  const handleTouchStart = useCallback(
    (e: React.TouchEvent, item: any, fromPosition: string | null) => {
      if (isSubmitted || isViewMode || touchDragRef.current) return;
      const touch = e.changedTouches[0];
      if (!touch) return;
      touchDragRef.current = {
        touchId: touch.identifier,
        item,
        fromPosition,
        startX: touch.clientX,
        startY: touch.clientY,
        hasMoved: false
      };
      setDraggedItem(item);
    },
    [isSubmitted, isViewMode]
  );

  const setDragPreviewPositionRef = useRef(setDragPreviewPosition);
  setDragPreviewPositionRef.current = setDragPreviewPosition;

  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      const ref = touchDragRef.current;
      if (!ref || ref.touchId === undefined) return;
      const touch = Array.from(e.touches).find((t) => t.identifier === ref.touchId);
      if (!touch) return;
      if (!ref.hasMoved) {
        const dx = touch.clientX - ref.startX;
        const dy = touch.clientY - ref.startY;
        if (Math.abs(dx) > TOUCH_DRAG_THRESHOLD || Math.abs(dy) > TOUCH_DRAG_THRESHOLD) {
          ref.hasMoved = true;
        }
      }
      if (ref.hasMoved) {
        setDragPreviewPositionRef.current({ x: touch.clientX, y: touch.clientY });
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    return () => document.removeEventListener('touchmove', onTouchMove, true);
  }, []);

  const applyDropForTouchRef = useRef(applyDropForTouch);
  applyDropForTouchRef.current = applyDropForTouch;

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    const ref = touchDragRef.current;
    if (!ref) return;
    const touch = Array.from(e.changedTouches).find((t) => t.identifier === ref.touchId);
    if (!touch) return;
    touchDragRef.current = null;
    setDraggedItem(null);
    setDragOverPosition(null);
    setDragPreviewPosition(null);

    if (!ref.hasMoved) return;

    const x = touch.clientX;
    const y = touch.clientY;
    const el = document.elementFromPoint(x, y);
    if (!el) return;

    const dropTarget = el.closest('[data-drop-position]');
    if (dropTarget) {
      const position = dropTarget.getAttribute('data-drop-position');
      if (position) {
        applyDropForTouchRef.current(position, ref.item);
      }
    }
  }, []);

  const handleTouchEndRef = useRef(handleTouchEnd);
  handleTouchEndRef.current = handleTouchEnd;

  useEffect(() => {
    const onTouchEnd = (e: TouchEvent) => {
      handleTouchEndRef.current(e);
    };
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('touchcancel', onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  // Use noOfRows and noOfColumns to create grid, fallback to targets length if not provided
  const rows = noOfRows || 1;
  const cols = noOfColumns || 1;

  // Create a map of bases by position for quick lookup
  const basesByPosition = new Map<string, any>();
  if (targets && targets.length > 0) {
    targets.forEach((base: any) => {
      if (base.position) {
        basesByPosition.set(base.position, base);
      }
    });
  }

  // Generate position string from row and column (1-indexed)
  const getPositionString = (row: number, col: number): string => {
    return `C${col}R${row}`;
  };

  // Generate all cells based on rows and columns
  const gridCells = [];
  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      const position = getPositionString(row, col);
      const base = basesByPosition.get(position);
      gridCells.push({ position, base });
    }
  }

  return (
    <DragDropContainer>
      {/* Touch drag preview (tablet) – same size/layout as option card */}
      {draggedItem && dragPreviewPosition && (
        <div
          aria-hidden
          style={{
            position: 'fixed',
            left: dragPreviewPosition.x,
            top: dragPreviewPosition.y,
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            pointerEvents: 'none',
            width: 158,
            minHeight: 160,
            padding: '24px 12px 20px',
            borderRadius: 18,
            background: '#f0f2f5',
            border: '2px solid #1890ff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            opacity: 0.95,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            textAlign: 'center',
            boxSizing: 'border-box'
          }}
        >
          {draggedItem?.option_image && (
            <img
              src={`${IMAGE_URL}scamper/${ImageTypeEnum.QUESTION}/${draggedItem.option_image}`}
              width={60}
              height={60}
              style={{ borderRadius: 8, objectFit: 'contain' }}
              alt=""
            />
          )}
          {draggedItem?.option_text && (
            <div
              style={{
                fontWeight: 500,
                fontSize: 14,
                lineHeight: 1.3,
                wordBreak: 'break-word',
                maxWidth: '100%'
              }}
            >
              {draggedItem.option_text}
            </div>
          )}
        </div>
      )}

      {/* LEFT SIDE – DROP BASES */}
      <DragDropBasesContainer $columns={cols}>
        {gridCells.map(({ position, base }) => {
          const droppedOptions = droppedItems[position] || [];
          const hasDroppedItems = droppedOptions.length > 0;
          const isDragOver = dragOverPosition === position;

          return (
            <DragDropTarget
              key={position}
              data-drop-position={position}
              onDragOver={
                isSubmitted || isViewMode ? undefined : (e) => handleDragOver(e, position)
              }
              onDragLeave={isSubmitted || isViewMode ? undefined : handleDragLeave}
              onDrop={isSubmitted || isViewMode ? undefined : (e) => handleDrop(e, position)}
              $isDragOver={isDragOver && !isSubmitted && !isViewMode}
              $isDropped={hasDroppedItems}
              $isCorrect={undefined} // Will be handled per item in view mode
            >
              {/* Base text label - show if base exists for this position */}
              {base && (
                <div
                  className="target-label"
                  style={{
                    marginBottom: hasDroppedItems ? '8px' : '0',
                    flexShrink: 0
                  }}
                >
                  {base.base_text || position}
                </div>
              )}

              {/* Dropped options container */}
              {hasDroppedItems ? (
                <DroppedOptionsContainer>
                  {droppedOptions.map((item: any) => (
                    <Tooltip key={item.id} title={item?.option_text || ''} placement="top">
                      <DroppedOptionItem
                        draggable={!isSubmitted && !isViewMode}
                        onTouchStart={(e) => handleTouchStart(e, item, position)}
                        onDragStart={(e) => handleDragStartFromBase(e, item, position)}
                        style={{
                          cursor: isSubmitted || isViewMode ? 'default' : 'grab',
                          touchAction: 'none'
                        }}
                      >
                        {!isSubmitted && !isViewMode && (
                          <RemoveButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFromBase(position, item.id);
                            }}
                            type="button"
                            aria-label="Remove item"
                          >
                            <CloseCircleOutlined />
                          </RemoveButton>
                        )}
                        {item?.option_image && (
                          <div className="image-container">
                            <img
                              src={`${IMAGE_URL}scamper/${ImageTypeEnum.QUESTION}/${item.option_image}`}
                              className="base-img"
                              alt={item?.option_text || ''}
                              draggable={false}
                            />
                          </div>
                        )}
                        {item?.option_text && (
                          <div className="target-label">{item.option_text}</div>
                        )}
                      </DroppedOptionItem>
                    </Tooltip>
                  ))}
                </DroppedOptionsContainer>
              ) : (
                <div className="empty-target"></div>
              )}
            </DragDropTarget>
          );
        })}
      </DragDropBasesContainer>

      {/* RIGHT SIDE – DRAGGABLE ITEMS */}
      <DraggableItems>
        {draggableItems?.map((item: any) => {
          const isDropped = isItemDropped(item.id);
          const showBlankBox = isDropped;
          // Disable dragging from original position if item is already dropped
          const canDrag = !isSubmitted && !isViewMode && !isDropped;
          return (
            <DraggableItem
              key={item.id}
              draggable={canDrag}
              onTouchStart={canDrag ? (e) => handleTouchStart(e, item, null) : undefined}
              onDragStart={(e) => handleDragStart(e, item)}
              $isDropped={isDropped}
              $isSubmitted={isSubmitted || isViewMode}
              style={canDrag ? { touchAction: 'none' } : undefined}
            >
              {/* <PointsBadge>{item.total_points} POINTS</PointsBadge> */}
              {!showBlankBox && item?.option_image && (
                <img
                  src={`${IMAGE_URL}scamper/${ImageTypeEnum.QUESTION}/${item.option_image}`}
                  width={60}
                  height={60}
                  style={{ borderRadius: 8 }}
                  alt={item?.option_text || ''}
                />
              )}
              {!showBlankBox && <div className="draggable-label">{item?.option_text}</div>}
            </DraggableItem>
          );
        })}
      </DraggableItems>
    </DragDropContainer>
  );
};
