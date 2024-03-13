"use client";

import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";

export const EmptyBoard = () => {
    const { organization } = useOrganization();
    const { mutate, pending} = useApiMutation(api.board.create);

    const onClick = () => {
        if (!organization) return;

        mutate({
            orgId: organization?.id,
            title: "Untitled",
        })

            .then((id) => {
                toast.success("Board created");
        })
            .catch(() => 
            toast.error("Failed to create board"))

    };

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image 
                src="/note.svg"
                alt="Empty"
                height={150}
                width={150}
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create your first board
            </h2>

            <p className="text-muted-foreground text-sm mt-2">
                Get started creating a board
            </p>

            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create board
                </Button>
            </div>
        </div>
    );
};