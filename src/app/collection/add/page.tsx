import AddItemForm from "@/app/components/AddItemForm";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AddItem() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    const {
      data: { user },
    } = await supabase.auth.getUser();
        
    if (!user) {
      redirect('/account/log-in');
    }

    return (
        <div>
            <h2>Add to Collection</h2>
            <p>Use the search field to look for a book. A successful match fills in all the required info fields for you.</p>

            <AddItemForm>
            </AddItemForm>
        </div>
    )
}