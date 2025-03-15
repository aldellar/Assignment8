import React, {createContext, useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';

const WorkspaceContext = createContext();
/**
 * Provides workspace data to child components.
 * @param {object} props - The incoming props object.
 * @param {React.ReactNode} props.children - The child elements that
 * will have access to the workspace context.
 * @returns {React.ReactElement} The provider that makes
 * workspace data available.
 */
export function WorkspaceProvider({children}) {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.accessToken) return;

      const response = await fetch('http://localhost:3010/api/v0/workspaces', {
        headers: {'Authorization': `Bearer ${user.accessToken}`},
      });

      if (response.ok) {
        const data = await response.json();
        setWorkspaces(data);
        setSelectedWorkspace(data.length > 0 ? data[0] : null);
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <WorkspaceContext.Provider value={{workspaces,
      selectedWorkspace, setSelectedWorkspace}}>
      {children}
    </WorkspaceContext.Provider>
  );
}
WorkspaceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
/**
 * Custom hook to access the workspace context.
 * @returns {object} The workspace context, containing:
 * - {Array<object>} workspaces: List of workspace objects.
 * - {object|null} selectedWorkspace: Currently selected workspace.
 * - {Function} setSelectedWorkspace: Updates the selected workspace.
 */
export function useWorkspace() {
  return useContext(WorkspaceContext);
}
