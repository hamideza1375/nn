import React, { useEffect } from 'react';
import Form from '../../../Components/Form';
import { foodState } from '../../../state/foodState';
import { useNavigation } from '@react-navigation/native';

export const CreateComment = ({ props: p }) => {
  const _food = new foodState(p);
  const navigation = useNavigation();
  useEffect(() => navigation.setOptions({ headerRight: () => <></> }), [p.showForm2]);
  return <Form m s c {...p} onPress={() => _food.sendComment()} />
};
