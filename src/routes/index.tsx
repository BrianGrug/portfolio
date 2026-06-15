import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { Table } from '@/components/retroui/Table';
import { Stats } from '@/components/Stats';
import { Card } from '@/components/retroui/Card';
import { cn } from '#/lib/utils';

export const Route = createFileRoute('/')({ component: Home })

const services = [
  {
    title: "Technical Consulting",
    description: "Figure out your needs for your business or project to succeed while being cost-effective.",
  },
  {
    title: "Web Development",
    description: "Fast, modern, accessible web apps from the database to the pixels.",
  },
  {
    title: "App & Mobile",
    description: "Cross-platform applications that feel native and ship quickly.",
  },
  {
    title: "System & Network Administration",
    description: "Server setup, configuration, and maintenance.",
  },
];

const skills = [
  { area: "Frontend", tools: "React, TanStack, TypeScript, Tailwind" },
  { area: "Backend", tools: "Java, Node, NoSQL, SQL, REST, GraphQL, gRPC" },
  { area: "Infrastructure", tools: "Docker, k8, Linux, Windows Server, GCP, AWS" },
  { area: "Mobile", tools: "Capacitor, Expo, React Native, Tauri" },
  { area: "Hardware", tools: "Firewalla, PowerEdge, Raspberry Pi, Arduino, ESP32-*, learning Ubiquiti" },
];

const ContactButton = ({ className }: { className?: string }) => {
  return (<Button onClick={() => window.open('mailto:brian@grug.dev')} className={cn(className)}>
    Contact Me
  </Button>)
}

function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24">
      <section className="mt-24 flex flex-col items-center text-center">
        <Text as="h1">MY NAME IS BRIAN</Text>
        <Text as="p" className="py-4 break-words max-w-xl text-muted-foreground">
          I'm a full-stack developer who also loves planes, trains, rockets,
          and automobiles (and space. Space is really cool).
        </Text>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <ContactButton />
          <Button
            variant="secondary"
            onClick={() => {
              const section = document.getElementById("services");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Keep Reading
          </Button>
        </div>
      </section>

      <section className="mt-20 flex justify-center">
        <Stats
          stats={[
            { value: "8+", label: "Years Coding" },
            { value: "50+", label: "Projects Completed" },
            { value: "∞", label: "Side projects" },
          ]}
        />
      </section>

      <section id="services" className="mt-24 scroll-mt-24">
        <div className="mb-8 text-center">
          <Text as="h2">Services I Offer</Text>
          <Text as="p" className="mt-2 max-w-xl mx-auto text-muted-foreground">
            A wide range of services to help with your project or business.
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title} className="block w-full">
              <Card.Header>
                <Card.Title>{service.title}</Card.Title>
                <Card.Description>{service.description}</Card.Description>
              </Card.Header>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="mb-8 text-center">
          <Text as="h2">Tools I Work With</Text>
        </div>
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
        <Card className="block w-full max-w-2xl text-center">
          <Card.Content className="py-10">
            <Text as="h2">Let's Build Something</Text>
            <Text as="p" className="mt-2 mb-6 text-muted-foreground">
              Have a project in mind? I'd love to hear about it.
            </Text>
            <ContactButton className="w-full" />
          </Card.Content>
        </Card>
      </section>
    </div>
  )
}
