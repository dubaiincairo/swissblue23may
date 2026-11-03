import NotFoundView from "@/components/not-found-view";
import { notFoundArtwork } from "@/lib/not-found-artwork";

export default async function NotFound() {
  const { logo, background } = await notFoundArtwork("en");
  return <NotFoundView locale="en" logo={logo} background={background} />;
}
