import React from 'react';
import {useWorkspace} from './WorkspaceContext';
/**
 * Renders the content of the selected workspace.
 * This component retrieves the currently selected workspace from
 * the workspace context and displays its name and content. If no
 * workspace is selected, it shows a fallback message.
 * @returns {React.ReactElement} The workspace content or a message
 * indicating no workspace is selected.
 */
export default function WorkspaceContent() {
  const {selectedWorkspace} = useWorkspace();

  if (!selectedWorkspace) return <p>No workspace selected.</p>;

  return (
    <div style={{flex: 1, padding: '20px'}}>
      <h2>{selectedWorkspace.name}</h2>
      <p>Workspace content goes here.</p>
    </div>
  );
}
