import React, { useEffect, useMemo, useRef, useState } from 'react';

import { IMAGE_URL } from 'utils/constants';
import { ImageTypeEnum } from 'utils/constants/enum';

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
  isSubmitted
}: {
  option: any;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  isSubmitted?: boolean;
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
  pairResults = {}
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

  // Shuffle left and right items (only once on mount, not in view mode)
  const shuffledLeftItems = useMemo(() => {
    if (isViewMode) return leftItems;
    return shuffleArray(leftItems || []);
  }, [leftItems, isViewMode]);

  const shuffledRightItems = useMemo(() => {
    if (isViewMode) return rightItems;
    return shuffleArray(rightItems || []);
  }, [rightItems, isViewMode]);

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

    if (isViewMode && (hasUserAnswers || hasUserPairs)) {
      // In view mode, use user's submitted pairs from API
      // New API structure: each answer has left_option_id, left_option, selected_option_id, selected_option, is_correct
      const newPairs =
        shuffledLeftItems?.map((leftItem: any) => {
          // Find answer where left_option_id matches this left item's ID
          // Or match by left_option.left_text
          let matchedRight: any = null;
          let isCorrect = false;

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
          } else if (userPairs.length > 0) {
            // Fallback to old userPairs structure
            const userPair = userPairs.find(
              (p: any) => p.left_id === leftItem.id || p.left?.id === leftItem.id
            );
            matchedRight = userPair
              ? shuffledRightItems?.find(
                  (r: any) => r.id === (userPair.right_id || userPair.right?.id)
                )
              : null;

            // Find correct right item - use correctPairs if available, otherwise use original mapping
            const correctRightId =
              correctPairsMapping[leftItem.id] || originalPairMapping[leftItem.id];
            const correctRight = correctRightId
              ? shuffledRightItems?.find((r: any) => r.id === correctRightId)
              : null;

            // Determine if pair is correct
            if (userPair && userPair.is_correct !== undefined) {
              isCorrect = userPair.is_correct;
            } else {
              isCorrect = matchedRight && correctRight && matchedRight.id === correctRight.id;
            }
          }

          return {
            left: leftItem,
            right: matchedRight || null,
            correctRight: null,
            isCorrect
          };
        }) || [];
      setPairs(newPairs);
      pairsInitializedRef.current = true;
      isInitializingRef.current = false;
    } else if (!isViewMode && shuffledLeftItems && shuffledLeftItems.length > 0) {
      // Default initialization - match shuffled left with shuffled right by index
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
            right: matchedRight,
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

  // Reset drag state when question changes
  useEffect(() => {
    setDraggedItem(null);
    setDraggedFromPairIndex(null);
    setDragOverIndex(null);
    setDragOverAvailableItemId(null);
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

  const handleDropOnPair = (e: React.DragEvent, pairIndex: number) => {
    e.preventDefault();
    if (!draggedItem || isSubmitted || isViewMode) return;

    const newPairs = [...pairs];
    const existingRight = newPairs[pairIndex].right;

    // If dragging from another pair, swap the items
    if (draggedFromPairIndex !== null) {
      // Place the dragged item in the target pair
      newPairs[pairIndex].right = draggedItem;
      // Place the existing item (if any) in the source pair
      newPairs[draggedFromPairIndex].right = existingRight;
    } else {
      // If dragging from somewhere else (shouldn't happen now), just place it
      newPairs[pairIndex].right = draggedItem;
    }

    setPairs(newPairs);
    setDraggedItem(null);
    setDraggedFromPairIndex(null);
    setDragOverIndex(null);
    setDragOverAvailableItemId(null);
  };

  // Get available right items (not yet matched)
  const availableRightItems = useMemo(() => {
    if (isSubmitted || isViewMode) return [];
    const matchedRightIds = new Set(pairs.filter((p: any) => p.right).map((p: any) => p.right.id));
    return shuffledRightItems.filter((item: any) => !matchedRightIds.has(item.id));
  }, [pairs, shuffledRightItems, isSubmitted, isViewMode]);

  return (
    <div>
      {/* Available right items to drag */}
      {!isSubmitted && !isViewMode && (
        <div
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
                    transform: dragOverAvailableItemId === rightItem.id ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <SimpleOptionDisplay
                    option={{
                      id: rightItem?.id,
                      option_image: rightItem?.option_image,
                      option_text: rightItem?.option_text
                    }}
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
        let finalIsCorrect: boolean | null = null;
        if (isViewMode && pair.right) {
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
        } else {
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
                  onDragStart={(e) => {
                    e.stopPropagation();
                    handleDragStart(e, pair.right, index);
                  }}
                  style={{
                    cursor: isSubmitted || isViewMode ? 'default' : 'grab',
                    opacity: draggedItem?.id === pair.right?.id ? 0.5 : 1,
                    userSelect: 'none'
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
