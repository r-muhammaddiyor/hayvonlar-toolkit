import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, edit } from './slices/animalSlice';
import { Modal, Button, TextInput, Grid, Card, Text, Image, Container } from '@mantine/core';

export default function App() {
  const animals = useSelector((state) => state.animals);
  const dispatch = useDispatch();

  const [modalOpened, setModalOpened] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    latinName: '',
    type: '',
    habitat: '',
    diet: '',
  });

  const handleSubmit = () => {
    if (editingAnimal) {
      dispatch(edit({ ...editingAnimal, ...formData }));
    } else {
      dispatch(add({ id: Date.now(), ...formData }));
    }
    setModalOpened(false);
    setEditingAnimal(null);
    setFormData({ name: '', latinName: '', type: '', habitat: '', diet: '' });
  };

  const handleEditClick = (animal) => {
    setEditingAnimal(animal);
    setFormData(animal);
    setModalOpened(true);
  };

  const handleAddClick = () => {
    setEditingAnimal(null);
    setFormData({ name: '', latinName: '', type: '', habitat: '', diet: '' });
    setModalOpened(true);
  };

  return (
    <Container py="md">
      <Button mb="md" onClick={handleAddClick}>
        Add Animal
      </Button>

      <Grid gutter="md">
        {animals.map((animal) => (
          <Grid.Col span={4} key={animal.id}>
            <Card shadow="sm" padding="lg" style={{ height: '100%' }}>
              <Text weight={500} size="lg" mt="sm">
                {animal.name}
              </Text>
              <Text size="sm" color="dimmed">
                {animal.latinName}
              </Text>
              <Text size="sm">{animal.type}</Text>
              <Text size="sm">{animal.habitat}</Text>
              <Text size="sm">{animal.diet}</Text>
              <Button mt="sm" fullWidth onClick={() => handleEditClick(animal)}>
                Edit
              </Button>
              <Button mt="xs" color="red" fullWidth onClick={() => dispatch(remove(animal.id))}>
                Delete
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={editingAnimal ? 'Edit Animal' : 'Add Animal'}
      >
        <TextInput
          placeholder="Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          placeholder="Latin Name"
          required
          value={formData.latinName}
          onChange={(e) => setFormData({ ...formData, latinName: e.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          placeholder="Type"
          required
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          placeholder="Habitat"
          required
          value={formData.habitat}
          onChange={(e) => setFormData({ ...formData, habitat: e.currentTarget.value })}
          mb="sm"
        />
        <TextInput
          placeholder="Diet"
          required
          value={formData.diet}
          onChange={(e) => setFormData({ ...formData, diet: e.currentTarget.value })}
          mb="sm"
        />
        <Button fullWidth mt="md" onClick={handleSubmit}>
          {editingAnimal ? 'Save Changes' : 'Add Animal'}
        </Button>
      </Modal>
    </Container>
  );
}
