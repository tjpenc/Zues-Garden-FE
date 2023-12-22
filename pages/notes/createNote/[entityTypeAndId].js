import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NoteForm from '../../../components/forms/NoteForm';
import { getSingleBed } from '../../../api/bedData';
import { getSinglePlant } from '../../../api/plantData';

export default function CreateNote() {
  const [entityType, setEntityType] = useState({});
  const [entity, setEntity] = useState({});
  const [id, setId] = useState();
  const router = useRouter();
  const { entityTypeAndId } = router.query;

  useEffect(() => {
    const [_entityType, _id] = entityTypeAndId.split('-');
    if (_entityType === 'bed') {
      getSingleBed(_id).then(setEntity);
    } else if (_entityType === 'plant') {
      getSinglePlant(_id).then(setEntity);
    }
    setEntityType(_entityType);
    setId(_id);
  }, [entityTypeAndId]);

  return (
    <>
      <div>Create a note for {entity.title}</div>
      {entityType === 'bed' ? <NoteForm bedId={id} /> : <NoteForm plantId={id} />}
    </>
  );
}
