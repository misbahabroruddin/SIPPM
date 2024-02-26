import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const formData = new FormData();
          formData.append("username", credentials.username);
          formData.append("password", credentials.password);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "multipart/form-data; boundary=XXX",
              },
              body: formData,
            },
          );
          const { data } = await response.json();

          const user = {
            id: data?.id,
            name: data?.name,
            username: data?.username,
            email: data?.email,
            emailVerifiedAt: data?.email_verified_at,
            biodataId: data?.biodata_id,
            avatar: data?.avatar,
            roles: data?.roles,
            accessToken: data?.token,
          };

          if (!data) {
            return null;
          }

          return user;
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.email = user.email;
        token.emailVerifiedAt = user.emailVerifiedAt;
        token.avatar = user.avatar;
        token.biodataId = user.biodataId;
        token.roles = user.roles;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.emailVerifiedAt = token.emailVerifiedAt;
        session.user.avatar = token.avatar;
        session.user.biodataId = token.biodataId;
        session.user.roles = token.roles;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};
