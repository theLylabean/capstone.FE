import { useEffect, useState } from "react";
import ResourceForm from "./ResourceForm";

function Resources(){
    const [resources, setResources] = useState();

    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(()=>{
        const getResources = async() => {
            try{
                const res = await fetch(`${baseUrl}/resources`);
                const data = await res.json();
                setResources(data);
            } catch(err) {
                console.error(err);
            }
        }
        getResources();
    }, [])

    return(
        <>
        <h1>RESOURCES</h1>

        <div>
            {resources && resources.length > 0 ? (
                resources.map((resource) => (
                    <div key={resource.id}>
                        <h2>{resource.title}</h2>
                        <h3>{resource.body}</h3>
                        <h4>{resource.created_at}</h4>
                    </div>
                )) 
            ) : (
                <p>No resources to show</p>
            )}
        </div>

{/* AUTHENTICATED USERS ONLY */}
        <div>
            {/* {token ? (
                <ResourceForm />
            ): (
                <p>Please log in to create resource</p>
            )} */}
        </div>

        <div>
            <button>Create Resource Post</button>
            <button>Edit Post</button>
        </div>
        </>
    )
}

export default Resources;