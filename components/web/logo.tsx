import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="relative h-8 w-25 overflow-hidden">
      <Image src="/slack_logo.svg" alt="Slack" fill sizes="w-full" className="dark:hidden" />
      <Image src="/slack_logo_light.svg" alt="Slack" fill sizes="w-full" className="hidden dark:block" />
    </Link>
  );
}
