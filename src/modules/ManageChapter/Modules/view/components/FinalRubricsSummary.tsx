import React from 'react';

import { IRubricItem } from 'services/chapter/types';

import {
  FinalRubricBadge,
  FinalRubricTotal,
  FinalRubricsSummary,
  FinalRubricsTable
} from '../ViewChapter.styled';

interface FinalRubricsSummaryProps {
  rubrics: IRubricItem[];
}

// Helper function to determine the level and score for a rubric
const getRubricLevel = (rubric: IRubricItem): { level: string; score: number } => {
  // This is a placeholder - in real implementation, this would come from the API
  // For now, we'll use a simple logic based on the rubric data
  // The actual implementation should get this from the student's submission data

  // Mock data for now - in real app, this would come from student's rubric scores
  if (rubric.parameter === 'Design') {
    return { level: 'Exemplary', score: 100 };
  }
  if (rubric.parameter === 'Craftsmanship') {
    return { level: 'Effective', score: 80 };
  }

  return { level: 'Acceptable', score: 60 };
};

export const FinalRubricsSummaryComponent: React.FC<FinalRubricsSummaryProps> = ({ rubrics }) => {
  // Temporary mock data for testing if rubrics is empty
  const tempRubrics: IRubricItem[] =
    rubrics && rubrics.length > 0
      ? rubrics
      : [
          {
            parameter: 'Design',
            max_score: 100,
            exemplary: '',
            effective: '',
            acceptable: '',
            developing: '',
            incomplete: ''
          },
          {
            parameter: 'Craftsmanship',
            max_score: 100,
            exemplary: '',
            effective: '',
            acceptable: '',
            developing: '',
            incomplete: ''
          }
        ];

  const rubricScores = tempRubrics.map((rubric) => ({
    ...rubric,
    ...getRubricLevel(rubric)
  }));

  const totalScore = rubricScores.reduce((sum, rubric) => sum + rubric.score, 0);

  return (
    <FinalRubricsSummary>
      <h3>Final Project Rubrics</h3>
      <FinalRubricsTable>
        <thead>
          <tr>
            {rubricScores.map((rubric, i) => (
              <th key={i}>{rubric.parameter}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {rubricScores.map((rubric, i) => (
              <td key={i}>
                <FinalRubricBadge $level={rubric.level}>
                  {rubric.level} - {rubric.score}
                </FinalRubricBadge>
              </td>
            ))}
            <td>
              <FinalRubricTotal>{totalScore}</FinalRubricTotal>
            </td>
          </tr>
        </tbody>
      </FinalRubricsTable>
    </FinalRubricsSummary>
  );
};
