import { useQuery } from "@tanstack/react-query";


const fetchUserName = async (userId, isLawyer) => {
    const url = `https://io2y7yr5a8.execute-api.eu-north-1.amazonaws.com/prod/api/users/${isLawyer ? 'get' : 'get-lawyer'}/${userId}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.name;
};

const UserName = ({ userId, isLawyer }) => {
    const { data: name, isLoading } = useQuery(['userName', userId, isLawyer], () => fetchUserName(userId, isLawyer));

    if (isLoading) {
        return <span>Loading...</span>;
    }

    return <span>{name}</span>;
};

export default UserName;
