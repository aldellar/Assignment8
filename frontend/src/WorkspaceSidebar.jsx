import {useWorkspace} from './WorkspaceContext';
/**
 * Sidebar component displaying a list of workspaces.
 * Allows users to select a workspace from the list.
 * @returns {Element} A sidebar containing a list of workspaces.
 */
export default function WorkspacesSidebar() {
  const {workspaces, selectedWorkspace, setSelectedWorkspace} = useWorkspace();
  const idselection = selectedWorkspace?.id;
  return (
    <div style={{width: '250px', height: '100vh',
      borderRight: '1px solid gray', padding: '10px'}}>
      <h3>Workspaces</h3>
      <ul>
        {workspaces.map((workspace) => (
          <li
            key={workspace.name}
            style={{
              cursor: 'pointer',
              padding: '8px',
              background: idselection === workspace.name?
               '#ddd' : 'transparent',
            }}
            onClick={() => setSelectedWorkspace(workspace)}
          >
            {workspace.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
