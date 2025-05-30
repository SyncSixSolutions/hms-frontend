// import { Button, Table, Input, Modal, Card, Container, Dropdown } from '../components/ui';
// import React, { useState } from 'react';

// const Dashboard: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState<string>('');

//   const guests = [
//     { name: 'John Doe', room: '101' },
//     { name: 'Jane Smith', room: '102' },
//   ];

//   const roomOptions = [
//     { label: 'Room 101', value: '101' },
//     { label: 'Room 102', value: '102' },
//     { label: 'Room 103', value: '103' },
//   ];

//   const columns = [
//     { header: 'Name', accessor: 'name' },
//     { header: 'Room', accessor: 'room' },
//   ];

//   return (
//     <div className="p-6">
//       <Button onClick={() => setIsModalOpen(true)}>Open Dashboard Modal</Button>
//       <Card title="Dashboard">
//       <Button variant='success'>Success Button</Button>
//       <Button variant='danger'>Danger Button</Button>
//       <Button variant='border'>Border Button</Button>
//       <Button variant='secondary'>Secondary Button</Button>
//       </Card>
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Dashboard">
//         <Container>
//           <div className="space-y-4 max-h-[75vh] overflow-y-auto">
//             <Dropdown
//               options={roomOptions}
//               selected={selectedRoom}
//               placeholder="Filter by room"
//               onSelect={(value) => setSelectedRoom(value)}
//             />
//             <Card title="Guest List">
//               <Table columns={columns} data={guests.filter(g => !selectedRoom || g.room === selectedRoom)} />
//             </Card>
//             <Input label="Search Guests" placeholder="Type a name..." />
//             <Button onClick={() => alert('Add clicked')}>Add Guest</Button>
//           </div>
//         </Container>
//       </Modal>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState } from 'react';
import {
  Sidebar,
  SidebarItem,
  Navbar,
  TabNav,
  TabItem,
  ContentArea,
  NavBarComponent,
} from '../components/layout';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div>
      <NavBarComponent />
      <div className="flex h-screen">
        <Sidebar>
          <SidebarItem label="Dashboard" active />
          <SidebarItem label="Properties" />
          <SidebarItem label="Settings" />
        </Sidebar>

        <div className="flex flex-col flex-1">
          <Navbar>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </Navbar>

          <TabNav>
            {['Overview', 'Stats', 'Reports'].map((tab) => (
              <TabItem
                key={tab}
                label={tab}
                active={tab === activeTab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </TabNav>

          <ContentArea>
            <p>Active Tab: {activeTab}</p>
          </ContentArea>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
