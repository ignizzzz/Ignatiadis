import Button from "@/components/Button";
import PopFlower from "@/components/PopFlower";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:py-32">
      <PopFlower className="size-20 animate-spin-slow motion-reduce:animate-none" />
      <h1 className="mt-8 font-display text-5xl sm:text-6xl font-extrabold uppercase leading-[0.95] tracking-tight text-blue">
        This page
        <br />
        got eaten.
      </h1>
      <p className="mt-5 max-w-sm text-lg text-blue-ink/70">
        Happens to the best of us — nothing here but crumbs. Let’s get you
        back to the good stuff.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Button href="/" variant="honey" size="lg">
          Back to home
        </Button>
        <Button href="/menu" variant="outline" size="lg">
          Straight to the menu
        </Button>
      </div>
    </div>
  );
}
