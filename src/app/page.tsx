import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Statement } from "@/components/sections/Statement";
import { Sites } from "@/components/sections/Sites";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { Tools } from "@/components/sections/Tools";
import { Contact } from "@/components/sections/Contact";

/* Beats de la portada (brief-v2): hero con el efecto → los casos (calmos) → statement (liquid-type) →
   sitios → experiencia (iris-opens) → stack, herramientas y cierre, calmos. */
export default function Home() {
  return <>
    {/* las precargas de los dos momentos de la portada (moments.md); React las sube al <head> */}
    <link rel="modulepreload" href="/assets/moments/liquid-type/moment.js" />
    <link rel="modulepreload" href="/assets/moments/iris-opens/moment.js" />
    <Nav /><main id="top"><Hero /><Projects /><Statement /><Sites /><Experience /><Stack /><Tools /></main><Contact /></>;
}
