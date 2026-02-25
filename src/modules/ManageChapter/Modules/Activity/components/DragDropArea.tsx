import { useCallback, useEffect, useState } from 'react';

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

  // Reset dropped items when question changes
  useEffect(() => {
    setDroppedItems(initialSelections || {});
    setDraggedItem(null);
    setDragOverPosition(null);
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

  // Handle drag start from draggable item
  const handleDragStart = useCallback(
    (e: React.DragEvent, item: any) => {
      if (isSubmitted || isViewMode) {
        e.preventDefault();
        return;
      }
      // Prevent dragging from original position if item is already dropped
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

  // Handle drop on base
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

          // Remove item from any other position first (one option can only be in one base)
          Object.keys(newSelections).forEach((pos) => {
            if (pos !== position && Array.isArray(newSelections[pos])) {
              newSelections[pos] = newSelections[pos].filter((i: any) => i.id !== item.id);
              // Remove position key if empty
              if (newSelections[pos].length === 0) {
                delete newSelections[pos];
              }
            }
          });

          // Initialize array for this position if it doesn't exist
          if (!newSelections[position]) {
            newSelections[position] = [];
          }

          // Check if item is already in this position
          const existingIndex = newSelections[position].findIndex((i: any) => i.id === item.id);

          if (existingIndex === -1) {
            // Add item to this position
            newSelections[position] = [...newSelections[position], item];
          }

          // Notify parent of changes
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

  // Handle drag start from dropped item in base (to move it)
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
      {/* LEFT SIDE – DROP BASES */}
      <DragDropBasesContainer $columns={cols}>
        {gridCells.map(({ position, base }) => {
          const droppedOptions = droppedItems[position] || [];
          const hasDroppedItems = droppedOptions.length > 0;
          const isDragOver = dragOverPosition === position;

          return (
            <DragDropTarget
              key={position}
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
                        onDragStart={(e) => handleDragStartFromBase(e, item, position)}
                        style={{
                          cursor: isSubmitted || isViewMode ? 'default' : 'grab'
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
              onDragStart={(e) => handleDragStart(e, item)}
              $isDropped={isDropped}
              $isSubmitted={isSubmitted || isViewMode}
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
