"use client";

import TemplatePage from "@/components/common/TemplatePage/TemplatePage";
import UserForm from "@/components/Users/UserForm/UserForm";
import UserController from "@/controllers/user-controller";
import { CompletedUser } from "@/types/User";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UserPage() {
  const session = useSession();
  const router = useRouter();
  const [userInfos, setUserInfos] = useState<CompletedUser>({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session.data?.user.id) {
      UserController.get(session.data?.user.id).then((response) => {
        if (response) setUserInfos({ ...response, password: "" });
      });
    }
  }, [session.data?.user.id]);

  return (
    <TemplatePage title="Meus Dados" backButton>
      <UserForm
        id={session.data?.user.id}
        userInfos={userInfos}
        successufulUpdate={() => router.push("/")}
        allowDelete
      />
    </TemplatePage>
  );
}
