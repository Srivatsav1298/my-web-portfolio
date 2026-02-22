/**
 * Skills Network Configuration
 * Category colors and names for the 3D skills visualization
 */

import { categoryColors, categoryNames, skillNodes, skillConnections } from '../../../data/portfolioData';

// Re-export from centralized data
export { categoryColors, categoryNames };

// Combined skillsData object for compatibility with existing code
export const skillsData = {
  nodes: skillNodes,
  connections: skillConnections,
};

// Category filter list for UI
export const categoryFilters = [
  { id: 'data', label: 'Data Science & Analytics', color: categoryColors.data },
  { id: 'database', label: 'Data Engineering', color: categoryColors.database },
  { id: 'cloud', label: 'Cloud & Architecture', color: categoryColors.cloud },
  { id: 'ai', label: 'AI & LLM', color: categoryColors.ai },
];
