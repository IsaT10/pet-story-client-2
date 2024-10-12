import TeamMemberCard from '@/components/ui/team-member-card';

const teamMembers = [
  {
    id: 1,
    name: 'Son',
    image: 'https://i.ibb.co/VVxjmbg/pexels-stefanstefancik-91227-1.jpg',
  },
  {
    id: 2,
    name: 'Steve',
    image: 'https://i.ibb.co/W5mbzM6/pexels-olly-846741-1.jpg',
  },
  {
    id: 3,
    name: 'Jhon',
    image: 'https://i.ibb.co/LnS2cFv/pexels-danxavier-1212984-1.jpg',
  },
  {
    id: 4,
    name: 'William',
    image: 'https://i.ibb.co/xJvkRm8/pexels-spencer-selover-142259-428333.jpg',
  },
];

export default function AboutPage() {
  return (
    <div className='mb-16'>
      <div>
        <h2 className='text-2xl font-semibold text-center mt-10 md:mt-20  mb-6'>
          Our Mission & Vision
        </h2>
        <p className='text-stone-500 lg:text-lg leading-relaxed text-center'>
          Our vision is to create a world where every pet receives the love,
          care, and attention they deserve, inspiring a culture of compassion
          and responsibility among pet owners. We aim to be the leading resource
          for pet care knowledge and uplifting stories, uniting a global
          community of pet enthusiasts who celebrate the joy and loyalty pets
          bring into our lives
        </p>
      </div>

      <div>
        <h2 className='text-2xl font-semibold text-center  my-10'>Our Team</h2>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-10'>
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
}
