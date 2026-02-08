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
  { id: 'backend', label: 'Backend', color: categoryColors.backend },
  { id: 'data', label: 'Data Science', color: categoryColors.data },
  { id: 'database', label: 'Databases', color: categoryColors.database },
  { id: 'cloud', label: 'Cloud', color: categoryColors.cloud },
  { id: 'dev', label: 'Dev', color: categoryColors.dev },
  { id: 'ai', label: 'AI', color: categoryColors.ai },
];
