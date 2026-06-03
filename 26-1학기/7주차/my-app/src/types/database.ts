export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      lions: {
        Row: {
          id: string;
          name: string;
          part: string;
          intro: string | null;
          email: string | null;
          phone: string | null;
          website: string | null;
          skills: string[] | null;
          tag: string | null;
          motto: string | null;
          image: string | null;
          track: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          part: string;
          intro?: string | null;
          email?: string | null;
          phone?: string | null;
          website?: string | null;
          skills?: string[] | null;
          tag?: string | null;
          motto?: string | null;
          image?: string | null;
          track?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          part?: string;
          intro?: string | null;
          email?: string | null;
          phone?: string | null;
          website?: string | null;
          skills?: string[] | null;
          tag?: string | null;
          motto?: string | null;
          image?: string | null;
          track?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type LionRow = Database['public']['Tables']['lions']['Row'];
export type LionInsert = Database['public']['Tables']['lions']['Insert'];
