'use client'
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-ignore
import ShareModal from 'lit-share-modal-v3'
// const ShareModal = require('lit-share-modal-v3')
// import './App.css'

const LitShare = ({ showShareModal, setShowShareModal }: any) => {
  const onUnifiedAccessControlConditionsSelected = (shareModalOutput: any) => {
    // do things with share modal output
  }

  return (
    <div className={'App'}>
      <button onClick={() => setShowShareModal(true)}>
        IPFS Access controll
      </button>

      {showShareModal && (
        <div className={'lit-share-modal'}>
          <ShareModal
            onClose={() => {
              setShowShareModal(false)
            }}
            onUnifiedAccessControlConditionsSelected={
              onUnifiedAccessControlConditionsSelected
            }
          />
        </div>
      )}
    </div>
  )
}

export default LitShare

// CSS in App.css

// .lit-share-modal {
//   width: 500px;
//   height: 700px;
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   border: 1px solid #333;
//   border-radius: 0.25em;
// }
