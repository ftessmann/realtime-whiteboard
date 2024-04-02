"use client"

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@clerk/nextjs";

import { Overlay } from "./overlay";
import { Footer } from "./footer";

import { formatDistanceToNow } from "date-fns";

import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

interface BoardCardProps {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavorite: boolean;
};

export const BoardCard = ({
    id,
    title,
    authorName,
    authorId,
    createdAt,
    imageUrl,
    orgId,
    isFavorite
    }: BoardCardProps ) => {
        const { userId } = useAuth();

        const authorLabel = userId === authorId ? "You" : authorName;
        const createdAtLabel = formatDistanceToNow(createdAt, {addSuffix: true});

        const {
            mutate: onFavorite,
            pending: pendingFavorite,
        } = useApiMutation(api.board.favorites);

        const {
            mutate: onUnfavorite,
            pending: pendingUnfavorite,
        } = useApiMutation(api.board.unfavorite);

        const toggleFavorite = () => {
            if (isFavorite) {
                onUnfavorite({ id })
                    .catch(() => toast.error("Failed to unfavorite"))
            } else {
                onFavorite({ id, orgId })
                    .catch(() => toast.error("Failed to favorite"))
            }
        };

        return (
                <Link href={`/board/${id}`}>
                    <div className="group aspect-[100/127] border rounded-lg flex
                                    flex-col justify-between overflow-hidden">

                        <div className="relative flex-1 bg-amber-50">
                             
                            <Image 
                                src={imageUrl}
                                alt={title}
                                fill
                                className="object-fit" 
                            />
                            <Overlay /> 

                            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100
                                               transition-opacity py-3 px-2 outline-none">

                                <Actions 
                                    id={id}
                                    title={title}
                                    side="right"
                                >
                                    <MoreHorizontal 
                                        className="text-white opacity-75 hover:opacity-100 
                                                    transition-opacity"
                                    />

                                </Actions>

                            </button>

                        </div>

                        <Footer 
                            isFavorite={isFavorite}
                            title={title}
                            authorLabel={authorLabel}
                            createdAtLabel={createdAtLabel}
                            onClick={toggleFavorite}
                            disabled={pendingFavorite || pendingUnfavorite}
                        />

                    </div>
                    
                </Link>
        );
    };

    BoardCard.Skeleton = function BoardCardSkeleton() {
        return (
            <div className="aspect-[100/127] rounded-lg justify-between overflow-hidden">
                <Skeleton className="h-full w-full" />
            </div>
        );
    };