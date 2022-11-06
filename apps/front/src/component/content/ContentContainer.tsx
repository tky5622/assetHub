// import { createStyles } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { usePublicationByPubId } from '../../hooks/useLens/useLens';
import { ContentCard } from './ContentCard';

export const ContentContainer = () => {
  const pathname = usePathname().split('/')
  const contentId = pathname[2]
  const { data, loading, error } = usePublicationByPubId(contentId)
  console.log(data, 'data')
  console.log(data?.publication, 'publication')


  return (
    <ContentCard image={''} title={''} description={''} country={''} badges={[{emoji: '', label: ''}]} />
  );
}