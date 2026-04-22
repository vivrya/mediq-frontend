export const WAITLIST_FORM = {
  roles: { ug: "UG student", pg: "PG aspirant", other: "Curious" },
  emailPlaceholder: "your@email.com",
  defaultCtaLabel: "Request early access",
  errors: {
    invalidEmail: "Please enter a valid email address.",
    generic: "Something went wrong. Please try again.",
  },
  captionDefault: "Free forever tier. No spam. Unsubscribe in one click.",
  captionWithCount: (count: number) =>
    `${count.toLocaleString()}+ medics ahead of you. Free forever tier. No spam.`,
  successMessage: (position?: number | null) =>
    position
      ? `You're in — spot #${position}. We'll email you when your slot opens.`
      : "You're in. We'll email you when your slot opens.",
};
