import AddItemForm from "@/app/components/AddItemForm";
import { Metadata } from "next";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Add Item - Shelfy",
  description: "Form for adding items to your Shelfy collection",
};

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
          <AddItemForm>
          </AddItemForm>
        </div>
    )
}
