import { ScheduleEvent } from '../components/ScheduleItem';

export const SCHEDULE_DATA: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Morning Stand-up',
    time: '9:00 AM - 9:30 AM',
    location: 'Conference Room A',
    type: 'meeting',
  },
  {
    id: '2',
    title: 'Client Presentation',
    time: '11:00 AM - 12:00 PM',
    location: 'Virtual Meeting',
    type: 'meeting',
  },
  {
    id: '3',
    title: 'Lunch with Team',
    time: '12:30 PM - 1:30 PM',
    location: 'Cafe Downtown',
    type: 'personal',
  },
  {
    id: '4',
    title: 'Project Review',
    time: '2:00 PM - 3:00 PM',
    location: 'Conference Room B',
    type: 'meeting',
  },
  {
    id: '5',
    title: 'Dental Appointment',
    time: '4:30 PM - 5:30 PM',
    location: 'Dental Clinic',
    type: 'appointment',
  },
  {
    id: '6',
    title: 'Gym Session',
    time: '6:30 PM - 7:30 PM',
    location: 'Fitness Center',
    type: 'personal',
  },
];

export const GALLERY_IMAGES = [
  {
    id: '1',
    uri: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Team Collaboration',
  },
  {
    id: '2',
    uri: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Business Meeting',
  },
  {
    id: '3',
    uri: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Creative Workshop',
  },
  {
    id: '4',
    uri: 'https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Product Launch',
  },
  {
    id: '5',
    uri: 'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Team Building',
  },
  {
    id: '6',
    uri: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Discussion Panel',
  },
];

export const VIDEOS = [
  {
    id: '1',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
    title: 'Big Buck Bunny',
  },
  {
    id: '2',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg',
    title: 'Elephants Dream',
  },
  {
    id: '3',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    poster: 'https://mango.blender.org/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg',
    title: 'Tears of Steel',
  },
];

export const CONTACT_TOPICS = [
  { label: 'General Inquiry', value: 'general' },
  { label: 'Technical Support', value: 'support' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Billing', value: 'billing' },
  { label: 'Other', value: 'other' },
];