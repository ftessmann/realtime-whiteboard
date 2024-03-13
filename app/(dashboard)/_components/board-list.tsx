"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { EmptyBoard } from "./empty-board";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";
import { BoardCard } from "./board-card";
import { NewBoardCard } from "./new-board-card";

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
};

export const BoardList = ({
    orgId,
    query,
}: BoardListProps) => {    
    const data = useQuery(api.boards.get, { orgId }); // API call

    if (true) {
        return (
            <div>

                <h2 className="text-3xl">
                    {query.favorites ? "Favorite boards" : "Team boards"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
                                xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                    <NewBoardCard orgId={orgId} disabled />
                    <BoardCard.Skeleton /> 
                    <BoardCard.Skeleton />       
                    <BoardCard.Skeleton />       
                    <BoardCard.Skeleton />                      
                </div>

            </div>
                

        )
    };

    if (!data?.length && query.search) {
        return (
            <div>
                <EmptySearch />
            </div>
        );
    }

    if (!data?.length && query.favorites) {
        return (
            <div>
                <EmptyFavorites />
            </div>
        );
    }

    if (!data?.length) {
        return (
            <div>
                <EmptyBoard />
            </div>
        );
    }

    return (
        <div>

            <h2 className="text-3xl">
                {query.favorites ? "Favorite boards" : "Team boards"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
                            xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">

                <NewBoardCard orgId={orgId} />

                {data?.map((board) => (
                    <BoardCard 
                        key={board._id}
                        id={board._id}
                        title={board.title}
                        imageUrl={board.imageUrl}
                        authorId={board.authorId}
                        authorName={board.authorName}
                        createdAt={board._creationTime}
                        orgId={board.orgId}
                        isFavorite={false}
                        />
                        )
                    )
                }

            </div>
        </div>
    );
};