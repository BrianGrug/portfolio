import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/retroui/Button';
import { Text } from '@/components/retroui/Text';
import { Table } from '@/components/retroui/Table';
import { Stats } from '@/components/Stats';
import { Card } from '@/components/retroui/Card';
import { cn } from '#/lib/utils';

export const Route = createFileRoute('/')({ component: Home });

const services = [
  {
    title: 'Technical Consulting',
    description:
      'Figure out your needs for your business or project to succeed while being cost-effective.',
  },
  {
    title: 'Web Development',
    description:
      'Fast, modern, accessible web apps from the database to the pixels.',
  },
  {
    title: 'App & Mobile',
    description:
      'Cross-platform applications that feel native and ship quickly.',
  },
  {
    title: 'System & Network Administration',
    description: 'Server setup, configuration, and maintenance.',
  },
];

const skills = [
  { area: 'Frontend', tools: 'React, TanStack, TypeScript, Tailwind' },
  { area: 'Backend', tools: 'Java, Node, NoSQL, SQL, REST, GraphQL, gRPC' },
  {
    area: 'Infrastructure',
    tools: 'Docker, k8, Linux, Windows Server, GCP, AWS',
  },
  { area: 'Mobile', tools: 'Capacitor, Expo, React Native, Tauri' },
  {
    area: 'Hardware',
    tools:
      'Firewalla, PowerEdge, Raspberry Pi, Arduino, ESP32-*, learning Ubiquiti',
  },
];

const ContactButton = ({
  className,
  variant,
}: {
  className?: string;
  variant?: 'default' | 'secondary' | 'outline' | 'link' | 'ghost';
}) => {
  return (
    <Button
      variant={variant}
      onClick={() => window.open('mailto:brian@grug.dev')}
      className={cn(className)}
    >
      Contact Me
    </Button>
  );
};

// Test for CI CD
const SectionHeading = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) => {
  return (
    <div className="mb-10 text-center">
      <span className="font-head text-xs uppercase tracking-widest text-muted-foreground">
        {eyebrow}
      </span>
      <Text as="h2" className="mt-2">
        {title}
      </Text>
      <div className="mx-auto mt-4 h-1.5 w-16 border-2 border-black bg-primary" />
      {description && (
        <Text as="p" className="mx-auto mt-4 max-w-xl text-muted-foreground">
          {description}
        </Text>
      )}
    </div>
  );
};

function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24">
      <section className="mt-20 grid items-center gap-12 lg:mt-28 lg:grid-cols-2">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="inline-flex items-center gap-2 border-2 border-black bg-card px-3 py-1 text-xs font-head uppercase tracking-widest shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Taking Commissions
          </span>
          <Text as="h1" className="mt-5">
            HI I'M GRUG
          </Text>
          <Text
            as="p"
            className="py-4 break-words max-w-xl text-muted-foreground"
          >
            But most people call me Brian. I like planes, trains and
            automobiles. More than that, I love rockets, and space. My dream is
            to help secure humanity's future in the stars.
          </Text>
          <div className="mt-2 flex flex-wrap justify-center gap-3 lg:justify-start">
            <ContactButton />
            <Button
              variant="secondary"
              onClick={() => {
                const section = document.getElementById('services');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Keep Reading
            </Button>
          </div>
        </div>

        <div className="hidden justify-end lg:flex">
          <Card className="w-full max-w-sm bg-primary text-primary-foreground shadow-xl hover:shadow-xl">
            <Card.Content className="flex aspect-square flex-col p-8">
              <div className="flex items-start justify-between font-head">
                <span className="text-3xl leading-none">5</span>
                <span className="text-xs uppercase tracking-widest">
                  10.811
                </span>
              </div>
              <span className="flex-1 text-center font-head text-[9rem] leading-none flex items-center justify-center">
                B
              </span>
              <div className="text-center">
                <p className="font-head text-2xl uppercase tracking-wide">
                  Brian
                </p>
                <p className="mt-1 font-head text-xs uppercase tracking-widest">
                  Full-Stack Developer
                </p>
              </div>
            </Card.Content>
          </Card>
        </div>
      </section>

      <section className="mt-16 flex justify-center">
        <Stats
          stats={[
            { value: '8+', label: 'Years Coding' },
            { value: '50+', label: 'Projects Completed' },
            { value: '∞', label: 'Side projects' },
          ]}
        />
      </section>

      <section id="services" className="mt-24 scroll-mt-24">
        <SectionHeading
          eyebrow="What I Do"
          title="Services I Offer"
          description="A wide range of services to help with your project or business."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <Card key={service.title} className="block w-full">
              <Card.Header>
                <span className="mb-2 font-head text-2xl text-muted-foreground">
                  0{i + 1}
                </span>
                <Card.Title>{service.title}</Card.Title>
                <Card.Description>{service.description}</Card.Description>
              </Card.Header>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading eyebrow="My Toolkit" title="Tools I Work With" />
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Area</Table.Head>
              <Table.Head>Stack</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {skills.map((skill) => (
              <Table.Row key={skill.area}>
                <Table.Cell className="font-head">{skill.area}</Table.Cell>
                <Table.Cell>{skill.tools}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>

      <section className="mt-24 flex justify-center">
        <Card className="block w-full max-w-2xl bg-primary text-primary-foreground text-center shadow-xl hover:shadow-xl">
          <Card.Content className="py-12">
            <span className="font-head text-xs uppercase tracking-widest">
              Get In Touch
            </span>
            <Text as="h2" className="mt-2">
              Let's Build Something
            </Text>
            <Text as="p" className="mt-2 mb-6">
              Have a project in mind? I'd love to hear about it.
            </Text>
            <ContactButton variant="secondary" className="w-full" />
          </Card.Content>
        </Card>
      </section>
    </div>
  );
}
