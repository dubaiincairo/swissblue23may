import NotFoundView from "@/components/not-found-view";
import { notFoundArtwork } from "@/lib/not-found-artwork";

export default async function NotFound() {
  const { logo, background } = await notFoundArtwork("ar");
  return <NotFoundView locale="ar" logo={logo} background={background} />;
}
