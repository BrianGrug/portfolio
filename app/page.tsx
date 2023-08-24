"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";

export default function Home() {

  let projects = [
    {
      name: "qProtect",
      description: "A highly secure Java Obfuscator that helps obfuscate your code, to help prom piracy during resale.",
      image: "https://mdma.dev/data/assets/logo/Icon.png",
      alt: "QP"
    },
    {
      name: "",
      description: "A fullstack anti-piracy system, built in Typescript, Java, and C++. Supports Java, and Typescript/ Javascript applications",
      image: "",
      alt: "APS"
    },
    {
      name: "Abyss 3D printer",
      description: "An expandable 3D printer platform, with a starting size of 1000mm^3. Currently being prototyped",
      image: "",
      alt: "A3P"
    },
    {
      name: "Abyss 3D printer",
      description: "An expandable 3D printer platform, with a starting size of 1000mm^3. Currently being prototyped",
      image: "",
      alt: "A3P"
    },
  ]



  return (
    <body>
      <div className="flex grid justify-center py-5">
        <h1 className="font-extrabold tracking-tight lg:text-5xl">
          Brian Kennedy
        </h1>

        <p className="text-xl text-muted-foreground">
          Hardware and Software specialist
        </p>
      </div>

      <div className="flex grid justify-evenly my-20">
        <Card className="w-[1000px] h-[400px]">
          <CardHeader>
            <CardTitle>Current Projects</CardTitle>
            <CardDescription>Projects that I am actively working on</CardDescription>
          </CardHeader>
          <CardContent>

            <div className="flex grid gap-2">

              {projects.map((project) =>
                <Card key={project.alt} className="flex drop-shadow-2xl w-[400px]">
                  <CardHeader>
                    <Avatar>
                      <AvatarImage src={project.image}></AvatarImage>
                      <AvatarFallback className="">{project.alt}</AvatarFallback>
                    </Avatar>

                    <CardTitle>{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent >
                    <p className="py-5">{project.description}</p>
                  </CardContent>
                </Card>
              )}
            </div>

          </CardContent>
        </Card>
      </div>
    </body>
  )
}
