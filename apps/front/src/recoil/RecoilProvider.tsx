'use client'
import { useCallback, useEffect, useState } from 'react';
import { RecoilRoot, SetRecoilState } from 'recoil';
import RecoilizeDebugger from 'recoilize';
import { LensProfileIdState } from './atoms/LensProfile';
import { LensSignupModalState } from './atoms/LensSignupModal';
// import * as i18n from './atoms/i18n';
// const RecoilizeDebugger = dynamic(
//   () => {
//     return import('recoilize');
//   },
//   { ssr: false }
// );

export default function RecoilProvider({
  children,
}: {
  children: JSX.Element,
}) {
  const initializeState = useCallback(({ set }: { set: SetRecoilState }) => {
    set(LensSignupModalState, false);
    set(LensProfileIdState, '')
  }, []);
  const [root, setRoot] = useState(null)

  useEffect(() => {

    if (typeof window.document !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setRoot(document.getElementById('__next'));
    }
  }, [root]);



  return (
    <RecoilRoot initializeState={initializeState}>
      <RecoilizeDebugger root={root}/>
      {children}
    </RecoilRoot>
  )
}
