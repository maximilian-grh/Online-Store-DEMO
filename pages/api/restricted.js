import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    res.send({
      content:
        "Geschützer Inhalt. Du kannst das sehen da du angemeldet bist.",
    });
  } else {
    res.send({
      error: "Du musst dich anmelden um diesen Inhalt sehen zu können.",
    });
  }
};
