import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
	return (
		<div className="footer">
			<div className="container-custom">
        <Link href="/" className="flex items-center">
          <Image
            src="/icons/Apply Digital Logo.svg"
            alt="Apply Digital Logo"
            width={170}
            height={44}
            className="footer-logo"
          />
        </Link>
			</div>
		</div>
	);
};
