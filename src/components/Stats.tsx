import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";

interface Stat {
  value: string;
  label: string;
}

interface StatsProps {
  stats: Stat[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <Card className="flex flex-col divide-y-2 divide-border sm:flex-row sm:divide-x-2 sm:divide-y-0">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-1 flex-col items-center gap-1 px-8 py-5 text-center"
        >
          <Text as="h3" className="text-3xl lg:text-4xl">
            {stat.value}
          </Text>
          <Text
            as="p"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            {stat.label}
          </Text>
        </div>
      ))}
    </Card>
  );
}
