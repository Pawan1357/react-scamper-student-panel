import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { IMAGE_URL } from 'utils/constants';
import { ImageTypeEnum } from 'utils/constants/enum';

import { ArrowIcon } from 'components/svg';

import { OptionItem } from '../ActivityView.styled';
import { PairMatchingContainer } from '../ActivityView.styled';
import { OptionContentWrapper, OptionImage } from './RadioOption.styled';

interface PairMatchingProps {
  leftItems: any[];
  rightItems: any[];
  onPairsChange?: (pairs: any[]) => void;
  isSubmitted?: boolean;
  isViewMode?: boolean;
  userPairs?: any[];
  userAnswers?: any[]; // API response answers array with is_correct
  correctPairs?: any[];
  pairResults?: {
    [pairKey: string]: {
      is_correct: boolean;
      points_earned: number;
    };
  };
  isPastActivity?: boolean; // Whether activity status is 'past'
  hasUserAnswer?: boolean; // Whether user has submitted answers
}

// Helper function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Simple option display without radio button
const SimpleOptionDisplay = ({
  option,
  isCorrect,
  isIncorrect,
  isSubmitted,
  showDragIcon = false
}: {
  option: any;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  isSubmitted?: boolean;
  showDragIcon?: boolean;
}) => {
  return (
    <OptionItem $isCorrect={isCorrect && isSubmitted} $isIncorrect={isIncorrect && isSubmitted}>
      <OptionContentWrapper>
        {option?.option_image && (
          <OptionImage
            src={`${IMAGE_URL}scamper/${ImageTypeEnum.QUESTION}/${option?.option_image}`}
            alt={option?.option_text}
            width={40}
            height={40}
            preview={false}
            className="option-image"
          />
        )}
        <span className="option-label">{option?.option_text}</span>
        {showDragIcon && (
          <div className="option-icon">
            <ArrowIcon />
          </div>
        )}
      </OptionContentWrapper>
    </OptionItem>
  );
};

export const PairMatching = ({
  leftItems,
  rightItems,
  onPairsChange,
  isSubmitted = false,
  isViewMode = false,
  userPairs = [],
  userAnswers = [],
  correctPairs = [],
  pairResults = {},
  isPastActivity = false,
  hasUserAnswer = false
}: PairMatchingProps) => {
  // Create mapping of original left to right (for correct answer checking)
  const originalPairMapping = useMemo(() => {
    const mapping: { [key: number]: number } = {};
    leftItems?.forEach((leftItem: any, index: number) => {
      const rightItem = rightItems?.[index];
      if (leftItem?.id && rightItem?.id) {
        mapping[leftItem.id] = rightItem.id;
      }
    });
    return mapping;
  }, [leftItems, rightItems]);

  // Shuffle left and right items
  // In view mode, shuffle only if it's past activity and user hasn't answered
  const shouldShuffle = !isViewMode || (isPastActivity && !hasUserAnswer);

  const shuffledLeftItems = useMemo(() => {
    if (shouldShuffle) return shuffleArray(leftItems || []);
    return leftItems || [];
  }, [leftItems, shouldShuffle]);

  const shuffledRightItems = useMemo(() => {
    if (shouldShuffle) return shuffleArray(rightItems || []);
    return rightItems || [];
  }, [rightItems, shouldShuffle]);

  // Initialize pairs - use userPairs if in view mode, otherwise initialize with correct pairs
  const [pairs, setPairs] = useState<any[]>([]);
  const pairsInitializedRef = useRef(false);
  const isInitializingRef = useRef(false);

  // Create mapping of correct pairs for view mode
  const correctPairsMapping = useMemo(() => {
    const mapping: { [leftId: number]: number } = {};
    correctPairs?.forEach((pair: any) => {
      const leftId = pair.left_id || pair.left?.id;
      const rightId = pair.right_id || pair.right?.id;
      if (leftId && rightId) {
        mapping[leftId] = rightId;
      }
    });
    return mapping;
  }, [correctPairs]);

  // // Create mapping from userAnswers (API response) - maps option_id to is_correct
  // const userAnswersMapping = useMemo(() => {
  //   const mapping: { [optionId: number]: { is_correct: boolean; rightItem: any } } = {};
  //   userAnswers?.forEach((answer: any) => {
  //     if (answer.selected_option_id && answer.selected_option) {
  //       // The selected_option contains both left and right info
  //       // Find the right item that matches this answer
  //       const rightItem = shuffledRightItems?.find(
  //         (r: any) => r.option_text === answer.selected_option.option_text || r.id === answer.selected_option_id
  //       );
  //       if (rightItem) {
  //         mapping[answer.selected_option_id] = {
  //           is_correct: answer.is_correct,
  //           rightItem
  //         };
  //       }
  //     }
  //   });
  //   return mapping;
  // }, [userAnswers, shuffledRightItems]);

  // Create a stable key to detect when question changes
  const questionKey = useMemo(() => {
    if (leftItems && leftItems.length > 0) {
      return leftItems.map((item: any) => item.id).join(',');
    }
    return '';
  }, [leftItems]);

  // Create stable keys for userAnswers and userPairs to prevent infinite loops
  const userAnswersKey = useMemo(() => {
    if (!userAnswers || userAnswers.length === 0) return '';
    // Use left_option_id and is_correct for stable key (new API structure)
    return userAnswers
      .map((a: any) => `${a.left_option_id || a.left_option?.id || ''}-${a.is_correct || false}`)
      .join(',');
  }, [userAnswers]);

  const userPairsKey = useMemo(() => {
    if (!userPairs || userPairs.length === 0) return '';
    return userPairs
      .map((p: any) => `${p.left_id || p.left?.id}-${p.right_id || p.right?.id}`)
      .join(',');
  }, [userPairs]);

  // Track the last question key to detect question changes
  const lastQuestionKeyRef = useRef<string>('');
  const initializationKeyRef = useRef<string>('');

  // Reset pairs when question changes (leftItems or rightItems change)
  useEffect(() => {
    // Only reset if question key actually changed
    if (questionKey !== lastQuestionKeyRef.current && questionKey !== '') {
      pairsInitializedRef.current = false;
      lastQuestionKeyRef.current = questionKey;
      initializationKeyRef.current = ''; // Reset initialization key
      isInitializingRef.current = false; // Reset initialization flag
      // Clear pairs when question changes
      setPairs([]);
      // Reset last pairs length
      lastPairsLengthRef.current = 0;
      lastPairsRef.current = [];
    }
  }, [questionKey]);

  useEffect(() => {
    // Prevent concurrent initialization
    if (isInitializingRef.current) {
      return;
    }

    // Create a unique key for this initialization attempt
    const currentInitKey = `${questionKey}-${isViewMode}-${userAnswersKey}-${userPairsKey}`;

    // Prevent infinite loop by checking if already initialized with this exact key
    if (initializationKeyRef.current === currentInitKey) {
      return;
    }

    // Don't initialize if we don't have items
    if (!shuffledLeftItems || shuffledLeftItems.length === 0) return;

    // Don't initialize if question key is empty
    if (!questionKey) return;

    // Don't initialize if question key doesn't match (wait for reset)
    if (questionKey !== lastQuestionKeyRef.current && lastQuestionKeyRef.current !== '') {
      return;
    }

    // Mark as initializing to prevent concurrent runs
    isInitializingRef.current = true;
    initializationKeyRef.current = currentInitKey;

    // Use keys to check instead of array lengths to avoid dependency issues
    const hasUserAnswers = userAnswersKey !== '';
    const hasUserPairs = userPairsKey !== '';

    if (isViewMode) {
      // In view mode, initialize pairs - either from user answers/pairs or with shuffled right items
      // If past activity and user hasn't answered, always use shuffled pairs without correctness
      const shouldUseShuffledPairs = isPastActivity && !hasUserAnswer;

      const newPairs =
        shuffledLeftItems?.map((leftItem: any, index: number) => {
          // Find answer where left_option_id matches this left item's ID
          // Or match by left_option.left_text
          let matchedRight: any = null;
          let isCorrect = false;

          if (!shouldUseShuffledPairs && hasUserAnswers) {
            const userAnswer = userAnswers.find(
              (answer: any) =>
                answer.left_option_id === leftItem.id ||
                (answer.left_option && answer.left_option.left_text === leftItem.left_text)
            );

            if (userAnswer && userAnswer.selected_option) {
              // The selected_option.option_text is the right side that was matched
              // Find the right item that matches this option_text
              matchedRight = shuffledRightItems?.find(
                (r: any) => r.option_text === userAnswer.selected_option.option_text
              );
              isCorrect = userAnswer.is_correct || false;
            }
          }

          if (!matchedRight && !shouldUseShuffledPairs && hasUserPairs && userPairs.length > 0) {
            // Fallback to old userPairs structure
            const userPair = userPairs.find(
              (p: any) =>
                p.left_id === leftItem.id ||
                p.left?.id === leftItem.id ||
                (p.left && p.left.id === leftItem.id)
            );

            if (userPair) {
              // Handle different userPair structures
              if (userPair.right) {
                matchedRight = shuffledRightItems?.find((r: any) => r.id === userPair.right.id);
              } else if (userPair.right_id) {
                matchedRight = shuffledRightItems?.find((r: any) => r.id === userPair.right_id);
              }

              // Find correct right item - use correctPairs if available, otherwise use original mapping
              const correctRightId =
                correctPairsMapping[leftItem.id] || originalPairMapping[leftItem.id];
              const correctRight = correctRightId
                ? shuffledRightItems?.find((r: any) => r.id === correctRightId)
                : null;

              // Determine if pair is correct
              if (userPair.is_correct !== undefined) {
                isCorrect = userPair.is_correct;
              } else {
                isCorrect = matchedRight && correctRight && matchedRight.id === correctRight.id;
              }
            }
          }

          // If no user answer/pair found, pair with shuffled right item by index (instead of null)
          if (!matchedRight) {
            matchedRight = shuffledRightItems?.[index] || null;
          }

          return {
            left: leftItem,
            right: matchedRight,
            correctRight: null,
            isCorrect: shouldUseShuffledPairs ? false : isCorrect // Don't set correctness for past activity without answers
          };
        }) || [];
      setPairs(newPairs);
      pairsInitializedRef.current = true;
      isInitializingRef.current = false;
    } else if (!isViewMode && shuffledLeftItems && shuffledLeftItems.length > 0) {
      // Default initialization - match shuffled left with shuffled right by index
      // Always pair each left item with a right item (shuffled) instead of leaving empty
      const newPairs =
        shuffledLeftItems?.map((leftItem: any, index: number) => {
          const matchedRight = shuffledRightItems?.[index] || null;
          // Find correct right item based on original mapping
          const correctRightId = originalPairMapping[leftItem.id];
          const correctRight = correctRightId
            ? shuffledRightItems?.find((r: any) => r.id === correctRightId)
            : null;
          return {
            left: leftItem,
            right: matchedRight, // Always assign a right item (shuffled)
            correctRight: correctRight || null
          };
        }) || [];
      setPairs(newPairs);
      pairsInitializedRef.current = true;
      isInitializingRef.current = false;
    } else {
      // No initialization needed, reset flag
      isInitializingRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    questionKey,
    isViewMode,
    userPairsKey,
    userAnswersKey
    // Note: We intentionally don't include shuffledLeftItems, shuffledRightItems, originalPairMapping, correctPairsMapping
    // in dependencies to prevent infinite loops. They're used inside the effect but we track changes via questionKey.
  ]);

  // Store onPairsChange in a ref to prevent it from triggering re-renders
  const onPairsChangeRef = useRef(onPairsChange);
  useEffect(() => {
    onPairsChangeRef.current = onPairsChange;
  }, [onPairsChange]);

  // Notify parent when pairs change (only if not in view mode and pairs are initialized)
  const lastPairsLengthRef = useRef<number>(0);
  const lastPairsRef = useRef<any[]>([]);

  useEffect(() => {
    if (!isViewMode && pairsInitializedRef.current && onPairsChangeRef.current) {
      const matchedPairs = pairs.filter((pair) => pair.right !== null);

      // Only call if pairs actually changed
      const pairsChanged =
        matchedPairs.length !== lastPairsLengthRef.current ||
        matchedPairs.some((pair, index) => {
          const lastPair = lastPairsRef.current[index];
          return (
            !lastPair ||
            pair.left?.id !== lastPair.left?.id ||
            pair.right?.id !== lastPair.right?.id
          );
        });

      if (pairsChanged) {
        lastPairsLengthRef.current = matchedPairs.length;
        lastPairsRef.current = matchedPairs;
        onPairsChangeRef.current(matchedPairs);
      }
    }
  }, [pairs, isViewMode]);

  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [draggedFromPairIndex, setDraggedFromPairIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [dragOverAvailableItemId, setDragOverAvailableItemId] = useState<number | null>(null);
  // Touch drag: preview position (follows finger like desktop ghost)
  const [dragPreviewPosition, setDragPreviewPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  // Touch drag state (for tablet/touch devices where HTML5 DnD doesn't fire)
  const touchDragRef = useRef<{
    touchId: number;
    item: any;
    fromPairIndex: number | null;
    startX: number;
    startY: number;
    hasMoved: boolean;
  } | null>(null);
  const TOUCH_DRAG_THRESHOLD = 10;

  // Refs for touch handlers to read latest values
  const pairsRef = useRef(pairs);
  const isSubmittedRef = useRef(isSubmitted);
  const isViewModeRef = useRef(isViewMode);
  pairsRef.current = pairs;
  isSubmittedRef.current = isSubmitted;
  isViewModeRef.current = isViewMode;

  // Reset drag state when question changes
  useEffect(() => {
    setDraggedItem(null);
    setDraggedFromPairIndex(null);
    setDragOverIndex(null);
    setDragOverAvailableItemId(null);
    setDragPreviewPosition(null);
    touchDragRef.current = null;
  }, [leftItems, rightItems]);

  const handleDragStart = (e: React.DragEvent, item: any, fromPairIndex: number | null = null) => {
    if (isSubmitted || isViewMode) {
      e.preventDefault();
      return;
    }
    setDraggedItem(item);
    setDraggedFromPairIndex(fromPairIndex);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, pairIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(pairIndex);
    setDragOverAvailableItemId(null); // Clear available item drag over when dragging over pair
  };

  const handleDragLeave = (e?: React.DragEvent) => {
    // Only clear if we're actually leaving the drop zone
    if (!e || !e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverIndex(null);
    }
  };

  // Shared drop logic (used by both mouse DnD and touch)
  const applyDropOnPair = useCallback(
    (pairIndex: number, item: any, fromPairIndex: number | null) => {
      if (!item || isSubmittedRef.current || isViewModeRef.current) return;
      const currentPairs = [...pairsRef.current];
      const existingRight = currentPairs[pairIndex].right;
      if (fromPairIndex !== null) {
        currentPairs[pairIndex].right = item;
        currentPairs[fromPairIndex].right = existingRight;
      } else {
        currentPairs[pairIndex].right = item;
      }
      setPairs(currentPairs);
      setDraggedItem(null);
      setDraggedFromPairIndex(null);
      setDragOverIndex(null);
      setDragOverAvailableItemId(null);
    },
    []
  );

  const handleDropOnPair = (e: React.DragEvent, pairIndex: number) => {
    e.preventDefault();
    if (!draggedItem || isSubmitted || isViewMode) return;
    applyDropOnPair(pairIndex, draggedItem, draggedFromPairIndex);
  };

  // Touch handlers for tablet/touch devices
  const handleTouchStart = useCallback(
    (e: React.TouchEvent, item: any, fromPairIndex: number | null) => {
      if (isSubmitted || isViewMode || touchDragRef.current) return;
      const touch = e.changedTouches[0];
      if (!touch) return;
      touchDragRef.current = {
        touchId: touch.identifier,
        item,
        fromPairIndex,
        startX: touch.clientX,
        startY: touch.clientY,
        hasMoved: false
      };
      setDraggedItem(item);
      setDraggedFromPairIndex(fromPairIndex);
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
      // Update floating preview position (same effect as desktop drag ghost)
      if (ref.hasMoved) {
        setDragPreviewPositionRef.current({ x: touch.clientX, y: touch.clientY });
      }
      // Prevent scroll whenever user is touching a draggable and moving (stops page scroll)
      e.preventDefault();
    };
    document.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    return () => document.removeEventListener('touchmove', onTouchMove, true);
  }, []);

  const handleTouchEndRef = useRef<(e: TouchEvent) => void>(() => {});
  const applyDropOnPairRef = useRef(applyDropOnPair);
  applyDropOnPairRef.current = applyDropOnPair;

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    const ref = touchDragRef.current;
    if (!ref) return;
    const touch = Array.from(e.changedTouches).find((t) => t.identifier === ref.touchId);
    if (!touch) return;
    touchDragRef.current = null;
    setDraggedItem(null);
    setDraggedFromPairIndex(null);
    setDragOverIndex(null);
    setDragOverAvailableItemId(null);
    setDragPreviewPosition(null);

    if (!ref.hasMoved) return; // was a tap, not a drag

    const x = touch.clientX;
    const y = touch.clientY;
    const el = document.elementFromPoint(x, y);
    if (!el) return;

    const pairDrop = el.closest('[data-pair-drop-index]');
    const availableDrop = el.closest('[data-available-drop]');
    if (pairDrop) {
      const indexStr = pairDrop.getAttribute('data-pair-drop-index');
      if (indexStr !== null) {
        const pairIndex = parseInt(indexStr, 10);
        if (!Number.isNaN(pairIndex)) {
          applyDropOnPairRef.current(pairIndex, ref.item, ref.fromPairIndex);
          return;
        }
      }
    }
    if (availableDrop && ref.fromPairIndex !== null) {
      setPairs((prev) => {
        const newPairs = [...prev];
        newPairs[ref.fromPairIndex!].right = null;
        return newPairs;
      });
    }
  }, []);

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

  // Get available right items (not yet matched)
  const availableRightItems = useMemo(() => {
    if (isSubmitted || isViewMode) return [];
    const matchedRightIds = new Set(pairs.filter((p: any) => p.right).map((p: any) => p.right.id));
    return shuffledRightItems.filter((item: any) => !matchedRightIds.has(item.id));
  }, [pairs, shuffledRightItems, isSubmitted, isViewMode]);

  return (
    <div>
      {/* Touch drag preview: follows finger like desktop drag ghost */}
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
            minWidth: 200,
            maxWidth: 280,
            padding: '16px',
            borderRadius: '12px',
            background: '#ffffff',
            border: '2px solid #1890ff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            opacity: 0.95
          }}
        >
          <SimpleOptionDisplay
            option={{
              id: draggedItem?.id,
              option_image: draggedItem?.option_image,
              option_text: draggedItem?.option_text
            }}
            showDragIcon={true}
          />
        </div>
      )}

      {/* Available right items to drag */}
      {!isSubmitted && !isViewMode && (
        <div
          data-available-drop
          style={{ marginBottom: '24px' }}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
          }}
          onDrop={(e) => {
            e.preventDefault();
            // If dragging from a pair, remove it from the pair
            if (draggedItem && draggedFromPairIndex !== null) {
              const newPairs = [...pairs];
              newPairs[draggedFromPairIndex].right = null;
              setPairs(newPairs);
              setDraggedItem(null);
              setDraggedFromPairIndex(null);
              setDragOverIndex(null);
              setDragOverAvailableItemId(null);
            }
          }}
        >
          {availableRightItems.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '12px'
              }}
            >
              {availableRightItems.map((rightItem: any) => (
                <div
                  key={rightItem.id}
                  draggable={true}
                  onTouchStart={(e) => handleTouchStart(e, rightItem, null)}
                  onDragStart={(e) => {
                    e.stopPropagation();
                    handleDragStart(e, rightItem, null);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.dataTransfer.dropEffect = 'move';
                    setDragOverAvailableItemId(rightItem.id);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragOverAvailableItemId(null);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    borderRadius: '12px',
                    background: dragOverAvailableItemId === rightItem.id ? '#e6f7ff' : '#ffffff',
                    border:
                      dragOverAvailableItemId === rightItem.id
                        ? '2px solid #1890ff'
                        : '2px solid rgba(0, 0, 0, 0.06)',
                    cursor: 'grab',
                    opacity: draggedItem?.id === rightItem.id ? 0.5 : 1,
                    transition: 'all 0.2s ease',
                    userSelect: 'none',
                    touchAction: 'none',
                    transform: dragOverAvailableItemId === rightItem.id ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <SimpleOptionDisplay
                    option={{
                      id: rightItem?.id,
                      option_image: rightItem?.option_image,
                      option_text: rightItem?.option_text
                    }}
                    showDragIcon={true}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pairs */}
      {pairs.map((pair: any, index: number) => {
        // Check if this pair has results from API (for submitted questions)
        const pairKey = pair.left?.id && pair.right?.id ? `${pair.left.id}-${pair.right.id}` : null;
        const pairResult = pairKey ? pairResults[pairKey] : null;

        // In view mode, get is_correct directly from API response
        // Don't show colors if it's past activity and user hasn't answered
        let finalIsCorrect: boolean | null = null;
        const shouldShowColors = !(isPastActivity && !hasUserAnswer);

        if (isViewMode && pair.right && shouldShowColors) {
          // Use isCorrect that was set during pair initialization from userAnswers
          if (pair.isCorrect !== undefined) {
            finalIsCorrect = pair.isCorrect;
          } else {
            // Fallback: find the answer directly from userAnswers for this specific pair
            // Match by left_option_id or left_option.left_text, and selected_option.option_text
            const userAnswer = userAnswers.find(
              (answer: any) =>
                (answer.left_option_id === pair.left?.id ||
                  (answer.left_option && answer.left_option.left_text === pair.left?.left_text)) &&
                answer.selected_option &&
                answer.selected_option.option_text === pair.right?.option_text
            );
            if (userAnswer && userAnswer.is_correct !== undefined) {
              finalIsCorrect = userAnswer.is_correct;
            }
          }
        } else if (!isViewMode) {
          // Not in view mode - use pairResult from submission
          finalIsCorrect = pairResult?.is_correct ?? null;
        }

        return (
          <PairMatchingContainer key={`pair-${index}`}>
            {/* Left item (static) */}
            <SimpleOptionDisplay
              option={{
                id: pair.left?.id,
                option_image: pair.left?.left_image,
                option_text: pair.left?.left_text
              }}
              isCorrect={finalIsCorrect === true}
              isIncorrect={finalIsCorrect === false}
              isSubmitted={isSubmitted || isViewMode}
            />

            {/* Right item (draggable drop zone) */}
            <div
              data-pair-drop-index={index}
              onDragOver={isSubmitted || isViewMode ? undefined : (e) => handleDragOver(e, index)}
              onDragLeave={isSubmitted || isViewMode ? undefined : (e) => handleDragLeave(e)}
              onDrop={
                isSubmitted || isViewMode
                  ? undefined
                  : (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDropOnPair(e, index);
                      setDragOverIndex(null);
                      setDragOverAvailableItemId(null);
                    }
              }
              style={{
                flex: 1,
                minHeight: '60px',
                border:
                  finalIsCorrect !== null && finalIsCorrect !== undefined
                    ? finalIsCorrect
                      ? '2px solid #68A729'
                      : '2px solid #FF4D4F'
                    : dragOverIndex === index
                      ? '2px solid #1890ff'
                      : isSubmitted
                        ? '2px solid #d9d9d9'
                        : '2px dashed #d9d9d9',
                borderRadius: '16px',
                padding: '8px',
                transition: 'all 0.2s ease',
                backgroundColor:
                  finalIsCorrect !== null && finalIsCorrect !== undefined
                    ? finalIsCorrect
                      ? '#f2fff3'
                      : '#fff1f0'
                    : dragOverIndex === index
                      ? '#e6f7ff'
                      : isSubmitted
                        ? 'transparent'
                        : '#fafafa',
                opacity: isSubmitted || isViewMode ? 0.7 : 1,
                transform: dragOverIndex === index ? 'scale(1.02)' : 'scale(1)'
              }}
            >
              {pair.right ? (
                <div
                  draggable={!isSubmitted && !isViewMode}
                  onTouchStart={(e) => handleTouchStart(e, pair.right, index)}
                  onDragStart={(e) => {
                    e.stopPropagation();
                    handleDragStart(e, pair.right, index);
                  }}
                  style={{
                    cursor: isSubmitted || isViewMode ? 'default' : 'grab',
                    opacity: draggedItem?.id === pair.right?.id ? 0.5 : 1,
                    userSelect: 'none',
                    touchAction: 'none'
                  }}
                >
                  <SimpleOptionDisplay
                    option={{
                      id: pair.right?.id,
                      option_image: pair.right?.option_image,
                      option_text: pair.right?.option_text
                    }}
                    isCorrect={finalIsCorrect === true}
                    isIncorrect={finalIsCorrect === false}
                    isSubmitted={isSubmitted || isViewMode}
                    showDragIcon={!isViewMode && !isSubmitted}
                  />
                </div>
              ) : (
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: '2px dashed #bfbfbf',
                    background: '#fafafa',
                    minHeight: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#bfbfbf',
                    height: '100%'
                  }}
                >
                  Drop here
                </div>
              )}
            </div>
          </PairMatchingContainer>
        );
      })}
    </div>
  );
};
