import React, { useEffect } from 'react';
import Form from '../../../Components/Form';
import { foodState } from '../../../state/foodState';
import { useNavigation } from '@react-navigation/native';

export const EditComment = ({ id3, props: p }) => {
  const { showForm } = p
  const _food = new foodState(p);
  _food.getEditComment(id3);
  const navigation = useNavigation();
  useEffect(() => navigation.setOptions({ headerRight: () => <></> }), [showForm, id3]);
  return <Form m s style={{ paddingTop: 30, height:'50%' }} {...p} onPress={() => _food.editComment(id3)} />
};
