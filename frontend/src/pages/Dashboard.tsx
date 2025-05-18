import { Button, Table, Input, Modal, Card, Container, Dropdown } from '../components/ui';
import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>('');

  const guests = [
    { name: 'John Doe', room: '101' },
    { name: 'Jane Smith', room: '102' },
  ];

  const roomOptions = [
    { label: 'Room 101', value: '101' },
    { label: 'Room 102', value: '102' },
    { label: 'Room 103', value: '103' },
  ];

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Room', accessor: 'room' },
  ];

  return (
    <div className="p-6">
      <Button onClick={() => setIsModalOpen(true)}>Open Dashboard Modal</Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Dashboard">
        <Container>
          <div className="space-y-4 max-h-[75vh] overflow-y-auto">
            <Dropdown
              options={roomOptions}
              selected={selectedRoom}
              placeholder="Filter by room"
              onSelect={(value) => setSelectedRoom(value)}
            />
            <Card title="Guest List">
              <Table columns={columns} data={guests.filter(g => !selectedRoom || g.room === selectedRoom)} />
            </Card>
            <Input label="Search Guests" placeholder="Type a name..." />
            <Button onClick={() => alert('Add clicked')}>Add Guest</Button>
          </div>
        </Container>
      </Modal>
    </div>
  );
};

export default Dashboard;
