import React from 'react';

function MasterPages( { pages } ) {
  // alert(pages);
  return (
    <div className='master-pages' id='MasterPages'
      style={{ position: 'absolute', left: 285, top: 34, zIndex: 1, width: '85%', height: '100%' }}>

        {pages}
    
    </div>
  )
}

export default MasterPages