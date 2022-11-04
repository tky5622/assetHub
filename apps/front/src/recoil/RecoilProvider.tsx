import { useCallback } from 'react';
import { RecoilRoot, SetRecoilState } from 'recoil';
import { LensProfileIdState } from './atoms/LensProfile';
import { LensSignupModalState } from './atoms/LensSignupModal';
// import * as i18n from './atoms/i18n';

export default function RecoilProvider({
  children,
}: {
  children: JSX.Element,
}) {
  const initializeState = useCallback(({ set }: { set: SetRecoilState }) => {
    set(LensSignupModalState, false);
    set(LensProfileIdState, '')
  }, []);

  return (
    <RecoilRoot initializeState={initializeState}>
      {children}
    </RecoilRoot>
  )
}
