"use client";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

const generateBreadcrumbs = (pathname: string) => {
  // Split the pathname into parts
  const pathParts = pathname.split("/").filter((part) => part);

  // Generate breadcrumb items
  return pathParts.map((part, index) => {
    const href = `/${pathParts.slice(0, index + 1).join("/")}`;
    return { href, label: part };
  });
};

export default function BasicBreadcrumbs() {
  const pathname = usePathname();

  // Generate breadcrumbs based on the current pathname
  const breadcrumbs = useMemo(() => generateBreadcrumbs(pathname), [pathname]);

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.href}>
            {index < breadcrumbs.length - 1 ? (
              <Link underline="hover" color="inherit" href={breadcrumb.href}>
                {breadcrumb.label}
              </Link>
            ) : (
              <Typography color="text.primary">{breadcrumb.label}</Typography>
            )}
          </React.Fragment>
        ))}
      </Breadcrumbs>
    </div>
  );
}
