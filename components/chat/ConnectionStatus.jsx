export function ConnectionStatus({ status }) {
  if (status === 'disconnected') {
    return null;
  }
  
  const statusClasses = {
    connecting: 'connecting',
    connected: 'connected',
  }[status];
  
  const statusText = {
    connecting: 'Connecting...',
    connected: 'Connected',
  }[status];
  
  return (
    <div className={`connection-status ${statusClasses}`}>
      {statusText}
    </div>
  );
}