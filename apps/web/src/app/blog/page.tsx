import Header from '../(home)/header';

export default function Blog() {
  return (
    <div>
      <div
        className="absolute inset-0 h-full bg-[linear-gradient(to_right,oklch(0.92_0.004_286.32)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.92_0.004_286.32)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)]"
        id="home"
      />
      <Header />
    </div>
  );
}
