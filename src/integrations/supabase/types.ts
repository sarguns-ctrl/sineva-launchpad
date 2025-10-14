export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      agent_applications: {
        Row: {
          created_at: string | null
          email: string
          experience_years: number | null
          full_name: string
          id: string
          license_number: string | null
          motivation: string | null
          package_type: string | null
          phone: string | null
          previous_company: string | null
          specializations: string[] | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          experience_years?: number | null
          full_name: string
          id?: string
          license_number?: string | null
          motivation?: string | null
          package_type?: string | null
          phone?: string | null
          previous_company?: string | null
          specializations?: string[] | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          experience_years?: number | null
          full_name?: string
          id?: string
          license_number?: string | null
          motivation?: string | null
          package_type?: string | null
          phone?: string | null
          previous_company?: string | null
          specializations?: string[] | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      agent_commissions: {
        Row: {
          agent_id: string | null
          client_id: string | null
          commission_amount: number
          commission_rate: number
          created_at: string | null
          id: string
          notes: string | null
          property_id: string | null
          sale_price: number
          status: string | null
          transaction_date: string
          transaction_type: string
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          client_id?: string | null
          commission_amount: number
          commission_rate: number
          created_at?: string | null
          id?: string
          notes?: string | null
          property_id?: string | null
          sale_price: number
          status?: string | null
          transaction_date: string
          transaction_type: string
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          client_id?: string | null
          commission_amount?: number
          commission_rate?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          property_id?: string | null
          sale_price?: number
          status?: string | null
          transaction_date?: string
          transaction_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_commissions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "employee_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_commissions_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_training_sessions: {
        Row: {
          ai_response: string | null
          created_at: string
          id: string
          module_id: string
          prompt: string | null
          session_data: Json | null
          session_type: string
          user_feedback: number | null
          user_id: string
        }
        Insert: {
          ai_response?: string | null
          created_at?: string
          id?: string
          module_id: string
          prompt?: string | null
          session_data?: Json | null
          session_type: string
          user_feedback?: number | null
          user_id: string
        }
        Update: {
          ai_response?: string | null
          created_at?: string
          id?: string
          module_id?: string
          prompt?: string | null
          session_data?: Json | null
          session_type?: string
          user_feedback?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_training_sessions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          agent_id: string | null
          appointment_type: string
          client_id: string | null
          created_at: string | null
          duration: number | null
          id: string
          notes: string | null
          property_id: string | null
          scheduled_at: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          appointment_type: string
          client_id?: string | null
          created_at?: string | null
          duration?: number | null
          id?: string
          notes?: string | null
          property_id?: string | null
          scheduled_at: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          appointment_type?: string
          client_id?: string | null
          created_at?: string | null
          duration?: number | null
          id?: string
          notes?: string | null
          property_id?: string | null
          scheduled_at?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "employee_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "appointments_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string
          category: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          is_featured: boolean
          is_published: boolean
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          category?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      brand_profiles: {
        Row: {
          accent_color: string | null
          created_at: string
          description: string | null
          font_family: string | null
          id: string
          industry: string | null
          keywords: string[] | null
          logo_url: string | null
          name: string
          primary_color: string | null
          secondary_color: string | null
          target_audience: string | null
          tone_of_voice: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          accent_color?: string | null
          created_at?: string
          description?: string | null
          font_family?: string | null
          id?: string
          industry?: string | null
          keywords?: string[] | null
          logo_url?: string | null
          name: string
          primary_color?: string | null
          secondary_color?: string | null
          target_audience?: string | null
          tone_of_voice?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          accent_color?: string | null
          created_at?: string
          description?: string | null
          font_family?: string | null
          id?: string
          industry?: string | null
          keywords?: string[] | null
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          secondary_color?: string | null
          target_audience?: string | null
          tone_of_voice?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      business_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      business_documents: {
        Row: {
          business_id: string
          created_at: string
          document_type: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          uploaded_by: string
        }
        Insert: {
          business_id: string
          created_at?: string
          document_type: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          uploaded_by: string
        }
        Update: {
          business_id?: string
          created_at?: string
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_documents_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_favorites: {
        Row: {
          business_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_favorites_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_inquiries: {
        Row: {
          business_id: string
          created_at: string
          id: string
          inquirer_email: string
          inquirer_id: string
          inquirer_name: string
          inquirer_phone: string | null
          investment_budget: number | null
          message: string
          status: string | null
          updated_at: string
          visa_requirement: string | null
        }
        Insert: {
          business_id: string
          created_at?: string
          id?: string
          inquirer_email: string
          inquirer_id: string
          inquirer_name: string
          inquirer_phone?: string | null
          investment_budget?: number | null
          message: string
          status?: string | null
          updated_at?: string
          visa_requirement?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string
          id?: string
          inquirer_email?: string
          inquirer_id?: string
          inquirer_name?: string
          inquirer_phone?: string | null
          investment_budget?: number | null
          message?: string
          status?: string | null
          updated_at?: string
          visa_requirement?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_inquiries_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_valuation_requests: {
        Row: {
          annual_revenue_range: string
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string
          status: string | null
          updated_at: string
        }
        Insert: {
          annual_revenue_range: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          annual_revenue_range?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      businesses: {
        Row: {
          annual_profit: number | null
          annual_revenue: number | null
          asking_price: number
          assets_included: string[] | null
          business_name: string
          category_id: string | null
          created_at: string
          description: string
          featured: boolean | null
          financing_available: boolean | null
          id: string
          images: Json | null
          industry: string
          inventory_included: boolean | null
          location_city: string
          location_state: string
          number_of_employees: number | null
          reason_for_selling: string | null
          roi_percentage: number | null
          seller_id: string
          status: string | null
          training_provided: boolean | null
          updated_at: string
          visa_eligible: boolean | null
          visa_types: string[] | null
          years_established: number | null
        }
        Insert: {
          annual_profit?: number | null
          annual_revenue?: number | null
          asking_price: number
          assets_included?: string[] | null
          business_name: string
          category_id?: string | null
          created_at?: string
          description: string
          featured?: boolean | null
          financing_available?: boolean | null
          id?: string
          images?: Json | null
          industry: string
          inventory_included?: boolean | null
          location_city: string
          location_state: string
          number_of_employees?: number | null
          reason_for_selling?: string | null
          roi_percentage?: number | null
          seller_id: string
          status?: string | null
          training_provided?: boolean | null
          updated_at?: string
          visa_eligible?: boolean | null
          visa_types?: string[] | null
          years_established?: number | null
        }
        Update: {
          annual_profit?: number | null
          annual_revenue?: number | null
          asking_price?: number
          assets_included?: string[] | null
          business_name?: string
          category_id?: string | null
          created_at?: string
          description?: string
          featured?: boolean | null
          financing_available?: boolean | null
          id?: string
          images?: Json | null
          industry?: string
          inventory_included?: boolean | null
          location_city?: string
          location_state?: string
          number_of_employees?: number | null
          reason_for_selling?: string | null
          roi_percentage?: number | null
          seller_id?: string
          status?: string | null
          training_provided?: boolean | null
          updated_at?: string
          visa_eligible?: boolean | null
          visa_types?: string[] | null
          years_established?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "business_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      certificate_templates: {
        Row: {
          background_image_url: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean
          is_default: boolean
          name: string
          template_data: Json
          updated_at: string
        }
        Insert: {
          background_image_url?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_default?: boolean
          name: string
          template_data?: Json
          updated_at?: string
        }
        Update: {
          background_image_url?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_default?: boolean
          name?: string
          template_data?: Json
          updated_at?: string
        }
        Relationships: []
      }
      client_documents: {
        Row: {
          client_id: string
          created_at: string
          document_type: string
          file_path: string
          file_size: number | null
          file_type: string
          id: string
          is_required: boolean | null
          is_verified: boolean | null
          notes: string | null
          title: string
          uploaded_by: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          client_id: string
          created_at?: string
          document_type: string
          file_path: string
          file_size?: number | null
          file_type: string
          id?: string
          is_required?: boolean | null
          is_verified?: boolean | null
          notes?: string | null
          title: string
          uploaded_by: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string
          document_type?: string
          file_path?: string
          file_size?: number | null
          file_type?: string
          id?: string
          is_required?: boolean | null
          is_verified?: boolean | null
          notes?: string | null
          title?: string
          uploaded_by?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_documents_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          agent_id: string | null
          assigned_at: string | null
          business_experience: string | null
          country_of_origin: string
          created_at: string
          current_location: string | null
          email: string
          english_proficiency: string | null
          family_members: number | null
          full_name: string
          id: string
          investment_amount: number | null
          investment_type: string | null
          last_contact_at: string | null
          lead_source: string | null
          next_follow_up_at: string | null
          notes: string | null
          phone: string | null
          previous_visa_history: string | null
          priority: string
          stage: string
          status: string
          timeline: string | null
          updated_at: string
          user_id: string | null
          visa_type: string
        }
        Insert: {
          agent_id?: string | null
          assigned_at?: string | null
          business_experience?: string | null
          country_of_origin: string
          created_at?: string
          current_location?: string | null
          email: string
          english_proficiency?: string | null
          family_members?: number | null
          full_name: string
          id?: string
          investment_amount?: number | null
          investment_type?: string | null
          last_contact_at?: string | null
          lead_source?: string | null
          next_follow_up_at?: string | null
          notes?: string | null
          phone?: string | null
          previous_visa_history?: string | null
          priority?: string
          stage?: string
          status?: string
          timeline?: string | null
          updated_at?: string
          user_id?: string | null
          visa_type: string
        }
        Update: {
          agent_id?: string | null
          assigned_at?: string | null
          business_experience?: string | null
          country_of_origin?: string
          created_at?: string
          current_location?: string | null
          email?: string
          english_proficiency?: string | null
          family_members?: number | null
          full_name?: string
          id?: string
          investment_amount?: number | null
          investment_type?: string | null
          last_contact_at?: string | null
          lead_source?: string | null
          next_follow_up_at?: string | null
          notes?: string | null
          phone?: string | null
          previous_visa_history?: string | null
          priority?: string
          stage?: string
          status?: string
          timeline?: string | null
          updated_at?: string
          user_id?: string | null
          visa_type?: string
        }
        Relationships: []
      }
      consultation_sessions: {
        Row: {
          action_items: Json | null
          agent_id: string
          client_id: string
          created_at: string
          duration: number | null
          id: string
          meeting_notes: string | null
          next_steps: string | null
          scheduled_at: string
          session_type: string
          status: string
          updated_at: string
        }
        Insert: {
          action_items?: Json | null
          agent_id: string
          client_id: string
          created_at?: string
          duration?: number | null
          id?: string
          meeting_notes?: string | null
          next_steps?: string | null
          scheduled_at: string
          session_type: string
          status?: string
          updated_at?: string
        }
        Update: {
          action_items?: Json | null
          agent_id?: string
          client_id?: string
          created_at?: string
          duration?: number | null
          id?: string
          meeting_notes?: string | null
          next_steps?: string | null
          scheduled_at?: string
          session_type?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultation_sessions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          country: string | null
          created_at: string
          email: string
          id: string
          inquiry_type: string
          investment_range: string | null
          message: string
          name: string
          phone: string | null
          status: string | null
          updated_at: string
          visa_type: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          email: string
          id?: string
          inquiry_type: string
          investment_range?: string | null
          message: string
          name: string
          phone?: string | null
          status?: string | null
          updated_at?: string
          visa_type?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          email?: string
          id?: string
          inquiry_type?: string
          investment_range?: string | null
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
          updated_at?: string
          visa_type?: string | null
        }
        Relationships: []
      }
      content_assets: {
        Row: {
          asset_format: string | null
          asset_type: string
          asset_url: string
          created_at: string
          generation_prompt: string | null
          id: string
          post_id: string | null
          user_id: string
        }
        Insert: {
          asset_format?: string | null
          asset_type: string
          asset_url: string
          created_at?: string
          generation_prompt?: string | null
          id?: string
          post_id?: string | null
          user_id: string
        }
        Update: {
          asset_format?: string | null
          asset_type?: string
          asset_url?: string
          created_at?: string
          generation_prompt?: string | null
          id?: string
          post_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_assets_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_training_paths: {
        Row: {
          created_at: string
          description: string | null
          employee_profile_id: string | null
          estimated_completion_weeks: number | null
          id: string
          is_active: boolean | null
          modules_sequence: Json | null
          path_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          employee_profile_id?: string | null
          estimated_completion_weeks?: number | null
          id?: string
          is_active?: boolean | null
          modules_sequence?: Json | null
          path_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          employee_profile_id?: string | null
          estimated_completion_weeks?: number | null
          id?: string
          is_active?: boolean | null
          modules_sequence?: Json | null
          path_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_training_paths_employee_profile_id_fkey"
            columns: ["employee_profile_id"]
            isOneToOne: false
            referencedRelation: "employee_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          document_type: Database["public"]["Enums"]["document_type"] | null
          employee_id: string | null
          file_path: string
          file_size: number | null
          file_type: string
          id: string
          is_training_material: boolean | null
          tags: string[] | null
          title: string
          training_record_id: string | null
          updated_at: string | null
          uploaded_by: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          document_type?: Database["public"]["Enums"]["document_type"] | null
          employee_id?: string | null
          file_path: string
          file_size?: number | null
          file_type: string
          id?: string
          is_training_material?: boolean | null
          tags?: string[] | null
          title: string
          training_record_id?: string | null
          updated_at?: string | null
          uploaded_by: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          document_type?: Database["public"]["Enums"]["document_type"] | null
          employee_id?: string | null
          file_path?: string
          file_size?: number | null
          file_type?: string
          id?: string
          is_training_material?: boolean | null
          tags?: string[] | null
          title?: string
          training_record_id?: string | null
          updated_at?: string | null
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_training_record_id_fkey"
            columns: ["training_record_id"]
            isOneToOne: false
            referencedRelation: "training_progress"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          campaign_name: string
          campaign_type: string
          created_at: string | null
          created_by: string | null
          email_content: string
          id: string
          scheduled_at: string | null
          sent_at: string | null
          status: string | null
          subject_line: string
          target_criteria: Json | null
          updated_at: string | null
        }
        Insert: {
          campaign_name: string
          campaign_type: string
          created_at?: string | null
          created_by?: string | null
          email_content: string
          id?: string
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject_line: string
          target_criteria?: Json | null
          updated_at?: string | null
        }
        Update: {
          campaign_name?: string
          campaign_type?: string
          created_at?: string | null
          created_by?: string | null
          email_content?: string
          id?: string
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject_line?: string
          target_criteria?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      email_recipients: {
        Row: {
          bounce_reason: string | null
          bounced: boolean | null
          campaign_id: string | null
          clicked_at: string | null
          delivered_at: string | null
          email_address: string
          id: string
          opened_at: string | null
          sent_at: string | null
          unsubscribed_at: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bounce_reason?: string | null
          bounced?: boolean | null
          campaign_id?: string | null
          clicked_at?: string | null
          delivered_at?: string | null
          email_address: string
          id?: string
          opened_at?: string | null
          sent_at?: string | null
          unsubscribed_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bounce_reason?: string | null
          bounced?: boolean | null
          campaign_id?: string | null
          clicked_at?: string | null
          delivered_at?: string | null
          email_address?: string
          id?: string
          opened_at?: string | null
          sent_at?: string | null
          unsubscribed_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_email_recipients_campaign_id"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_certificates: {
        Row: {
          certificate_data: Json
          created_at: string
          employee_id: string
          id: string
          issued_at: string
          module_id: string
          pdf_url: string | null
          template_id: string
        }
        Insert: {
          certificate_data?: Json
          created_at?: string
          employee_id: string
          id?: string
          issued_at?: string
          module_id: string
          pdf_url?: string | null
          template_id: string
        }
        Update: {
          certificate_data?: Json
          created_at?: string
          employee_id?: string
          id?: string
          issued_at?: string
          module_id?: string
          pdf_url?: string | null
          template_id?: string
        }
        Relationships: []
      }
      employee_documents_new: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          document_type: string | null
          employee_id: string
          file_path: string
          file_size: number | null
          file_type: string
          id: string
          is_training_material: boolean | null
          tags: string[] | null
          title: string
          training_record_id: string | null
          updated_at: string | null
          uploaded_by: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          document_type?: string | null
          employee_id: string
          file_path: string
          file_size?: number | null
          file_type: string
          id?: string
          is_training_material?: boolean | null
          tags?: string[] | null
          title: string
          training_record_id?: string | null
          updated_at?: string | null
          uploaded_by: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          document_type?: string | null
          employee_id?: string
          file_path?: string
          file_size?: number | null
          file_type?: string
          id?: string
          is_training_material?: boolean | null
          tags?: string[] | null
          title?: string
          training_record_id?: string | null
          updated_at?: string | null
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_documents_new_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_invitations: {
        Row: {
          created_at: string | null
          department_id: string | null
          email: string
          expires_at: string | null
          full_name: string
          id: string
          invited_by: string
          is_used: boolean | null
          position: string | null
          temporary_password: string
        }
        Insert: {
          created_at?: string | null
          department_id?: string | null
          email: string
          expires_at?: string | null
          full_name: string
          id?: string
          invited_by: string
          is_used?: boolean | null
          position?: string | null
          temporary_password: string
        }
        Update: {
          created_at?: string | null
          department_id?: string | null
          email?: string
          expires_at?: string | null
          full_name?: string
          id?: string
          invited_by?: string
          is_used?: boolean | null
          position?: string | null
          temporary_password?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_invitations_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_profiles: {
        Row: {
          career_goals: string | null
          created_at: string
          current_skill_level: string | null
          department_id: string | null
          email: string
          employee_id: string | null
          full_name: string
          hire_date: string | null
          id: string
          is_active: boolean
          learning_preferences: string | null
          manager_id: string | null
          onboarding_completed: boolean | null
          onboarding_modules: Json | null
          position: string | null
          preferred_learning_style: string | null
          previous_training: string[] | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          career_goals?: string | null
          created_at?: string
          current_skill_level?: string | null
          department_id?: string | null
          email: string
          employee_id?: string | null
          full_name: string
          hire_date?: string | null
          id?: string
          is_active?: boolean
          learning_preferences?: string | null
          manager_id?: string | null
          onboarding_completed?: boolean | null
          onboarding_modules?: Json | null
          position?: string | null
          preferred_learning_style?: string | null
          previous_training?: string[] | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          career_goals?: string | null
          created_at?: string
          current_skill_level?: string | null
          department_id?: string | null
          email?: string
          employee_id?: string | null
          full_name?: string
          hire_date?: string | null
          id?: string
          is_active?: boolean
          learning_preferences?: string | null
          manager_id?: string | null
          onboarding_completed?: boolean | null
          onboarding_modules?: Json | null
          position?: string | null
          preferred_learning_style?: string | null
          previous_training?: string[] | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_profiles_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_profiles_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "employee_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_scenarios: {
        Row: {
          calculations: Json | null
          created_at: string | null
          down_payment: number
          hoa_fees: number | null
          id: string
          insurance: number | null
          interest_rate: number
          loan_term: number
          property_id: string | null
          property_taxes: number | null
          purchase_price: number
          scenario_name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          calculations?: Json | null
          created_at?: string | null
          down_payment: number
          hoa_fees?: number | null
          id?: string
          insurance?: number | null
          interest_rate: number
          loan_term: number
          property_id?: string | null
          property_taxes?: number | null
          purchase_price: number
          scenario_name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          calculations?: Json | null
          created_at?: string | null
          down_payment?: number
          hoa_fees?: number | null
          id?: string
          insurance?: number | null
          interest_rate?: number
          loan_term?: number
          property_id?: string | null
          property_taxes?: number | null
          purchase_price?: number
          scenario_name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_scenarios_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      immigration_services: {
        Row: {
          base_fee: number | null
          country_focus: string[] | null
          created_at: string
          description: string
          id: string
          investment_max: number | null
          investment_min: number | null
          is_active: boolean | null
          processing_time: string | null
          requirements: Json
          service_name: string
          service_type: string
          updated_at: string
        }
        Insert: {
          base_fee?: number | null
          country_focus?: string[] | null
          created_at?: string
          description: string
          id?: string
          investment_max?: number | null
          investment_min?: number | null
          is_active?: boolean | null
          processing_time?: string | null
          requirements?: Json
          service_name: string
          service_type: string
          updated_at?: string
        }
        Update: {
          base_fee?: number | null
          country_focus?: string[] | null
          created_at?: string
          description?: string
          id?: string
          investment_max?: number | null
          investment_min?: number | null
          is_active?: boolean | null
          processing_time?: string | null
          requirements?: Json
          service_name?: string
          service_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          application_status: string | null
          applied_at: string
          candidate_email: string
          candidate_name: string
          candidate_phone: string | null
          cover_letter: string | null
          created_at: string
          id: string
          job_posting_id: string
          notes: string | null
          portal_source: string
          resume_url: string | null
          updated_at: string
        }
        Insert: {
          application_status?: string | null
          applied_at?: string
          candidate_email: string
          candidate_name: string
          candidate_phone?: string | null
          cover_letter?: string | null
          created_at?: string
          id?: string
          job_posting_id: string
          notes?: string | null
          portal_source: string
          resume_url?: string | null
          updated_at?: string
        }
        Update: {
          application_status?: string | null
          applied_at?: string
          candidate_email?: string
          candidate_name?: string
          candidate_phone?: string | null
          cover_letter?: string | null
          created_at?: string
          id?: string
          job_posting_id?: string
          notes?: string | null
          portal_source?: string
          resume_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          created_at: string
          created_by: string
          department_id: string | null
          description: string
          expires_date: string | null
          id: string
          job_type: string | null
          location: string | null
          portal: string
          position: string
          posted_date: string | null
          salary_max: number | null
          salary_min: number | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          department_id?: string | null
          description: string
          expires_date?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          portal: string
          position: string
          posted_date?: string | null
          salary_max?: number | null
          salary_min?: number | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          department_id?: string | null
          description?: string
          expires_date?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          portal?: string
          position?: string
          posted_date?: string | null
          salary_max?: number | null
          salary_min?: number | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_postings_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_base: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          created_by: string
          id: string
          is_published: boolean | null
          tags: string[] | null
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          created_by: string
          id?: string
          is_published?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          created_by?: string
          id?: string
          is_published?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          agent_id: string | null
          contact_info: Json
          conversion_date: string | null
          created_at: string | null
          estimated_value: number | null
          id: string
          last_contact_at: string | null
          lead_source: string
          lead_status: string | null
          notes: string | null
          priority: string | null
          property_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          agent_id?: string | null
          contact_info: Json
          conversion_date?: string | null
          created_at?: string | null
          estimated_value?: number | null
          id?: string
          last_contact_at?: string | null
          lead_source: string
          lead_status?: string | null
          notes?: string | null
          priority?: string | null
          property_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          agent_id?: string | null
          contact_info?: Json
          conversion_date?: string | null
          created_at?: string | null
          estimated_value?: number | null
          id?: string
          last_contact_at?: string | null
          lead_source?: string
          lead_status?: string | null
          notes?: string | null
          priority?: string | null
          property_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "employee_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      market_insights: {
        Row: {
          created_at: string | null
          data_points: Json
          data_source: string | null
          id: string
          insight_summary: string | null
          insight_type: string
          location: string
          time_period: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          data_points: Json
          data_source?: string | null
          id?: string
          insight_summary?: string | null
          insight_type: string
          location: string
          time_period: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          data_points?: Json
          data_source?: string | null
          id?: string
          insight_summary?: string | null
          insight_type?: string
          location?: string
          time_period?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          property_id: string | null
          recipient_id: string | null
          sender_id: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          property_id?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          property_id?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_templates: {
        Row: {
          created_at: string
          email_body: string
          email_subject: string
          id: string
          is_active: boolean
          push_body: string | null
          push_title: string | null
          template_name: string
          updated_at: string
          variables: Json | null
        }
        Insert: {
          created_at?: string
          email_body: string
          email_subject: string
          id?: string
          is_active?: boolean
          push_body?: string | null
          push_title?: string | null
          template_name: string
          updated_at?: string
          variables?: Json | null
        }
        Update: {
          created_at?: string
          email_body?: string
          email_subject?: string
          id?: string
          is_active?: boolean
          push_body?: string | null
          push_title?: string | null
          template_name?: string
          updated_at?: string
          variables?: Json | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          is_read: boolean
          message: string
          metadata: Json | null
          priority: string | null
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          metadata?: Json | null
          priority?: string | null
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          metadata?: Json | null
          priority?: string | null
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      onboarding_steps: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          is_completed: boolean | null
          step_name: string
          step_order: number
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          step_name: string
          step_order: number
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          step_name?: string
          step_order?: number
          user_id?: string
        }
        Relationships: []
      }
      post_analytics: {
        Row: {
          clicks: number | null
          comments: number | null
          created_at: string
          engagement_rate: number | null
          id: string
          impressions: number | null
          last_updated: string | null
          likes: number | null
          platform: string
          post_id: string
          reach: number | null
          shares: number | null
        }
        Insert: {
          clicks?: number | null
          comments?: number | null
          created_at?: string
          engagement_rate?: number | null
          id?: string
          impressions?: number | null
          last_updated?: string | null
          likes?: number | null
          platform: string
          post_id: string
          reach?: number | null
          shares?: number | null
        }
        Update: {
          clicks?: number | null
          comments?: number | null
          created_at?: string
          engagement_rate?: number | null
          id?: string
          impressions?: number | null
          last_updated?: string | null
          likes?: number | null
          platform?: string
          post_id?: string
          reach?: number | null
          shares?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_analytics_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          brand_profile_id: string | null
          created_at: string
          has_image: boolean | null
          has_video: boolean | null
          id: string
          output_text: string
          platform: string
          post_url: string | null
          published_platforms: string[] | null
          scheduled_at: string | null
          status: string | null
          topic: string
          updated_at: string
          user_id: string
        }
        Insert: {
          brand_profile_id?: string | null
          created_at?: string
          has_image?: boolean | null
          has_video?: boolean | null
          id?: string
          output_text: string
          platform: string
          post_url?: string | null
          published_platforms?: string[] | null
          scheduled_at?: string | null
          status?: string | null
          topic: string
          updated_at?: string
          user_id: string
        }
        Update: {
          brand_profile_id?: string | null
          created_at?: string
          has_image?: boolean | null
          has_video?: boolean | null
          id?: string
          output_text?: string
          platform?: string
          post_url?: string | null
          published_platforms?: string[] | null
          scheduled_at?: string | null
          status?: string | null
          topic?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_brand_profile_id_fkey"
            columns: ["brand_profile_id"]
            isOneToOne: false
            referencedRelation: "brand_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          agent_id: string | null
          bathrooms: number | null
          bedrooms: number | null
          city: string
          created_at: string | null
          description: string | null
          featured: boolean | null
          id: string
          images: Json | null
          listing_type: string
          lot_size: number | null
          price: number
          property_features: Json | null
          property_type: string
          square_feet: number | null
          state: string
          status: string | null
          title: string
          updated_at: string | null
          virtual_tour_url: string | null
          year_built: number | null
          zip_code: string
        }
        Insert: {
          address: string
          agent_id?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: Json | null
          listing_type: string
          lot_size?: number | null
          price: number
          property_features?: Json | null
          property_type: string
          square_feet?: number | null
          state: string
          status?: string | null
          title: string
          updated_at?: string | null
          virtual_tour_url?: string | null
          year_built?: number | null
          zip_code: string
        }
        Update: {
          address?: string
          agent_id?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: Json | null
          listing_type?: string
          lot_size?: number | null
          price?: number
          property_features?: Json | null
          property_type?: string
          square_feet?: number | null
          state?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          virtual_tour_url?: string | null
          year_built?: number | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "properties_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "employee_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_analytics: {
        Row: {
          contact_agent: number | null
          created_at: string | null
          date: string
          favorites: number | null
          id: string
          inquiries: number | null
          property_id: string | null
          views: number | null
          virtual_tours: number | null
        }
        Insert: {
          contact_agent?: number | null
          created_at?: string | null
          date: string
          favorites?: number | null
          id?: string
          inquiries?: number | null
          property_id?: string | null
          views?: number | null
          virtual_tours?: number | null
        }
        Update: {
          contact_agent?: number | null
          created_at?: string | null
          date?: string
          favorites?: number | null
          id?: string
          inquiries?: number | null
          property_id?: string | null
          views?: number | null
          virtual_tours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "property_analytics_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_comparisons: {
        Row: {
          comparison_criteria: Json | null
          created_at: string | null
          id: string
          property_ids: string[]
          user_id: string | null
        }
        Insert: {
          comparison_criteria?: Json | null
          created_at?: string | null
          id?: string
          property_ids: string[]
          user_id?: string | null
        }
        Update: {
          comparison_criteria?: Json | null
          created_at?: string | null
          id?: string
          property_ids?: string[]
          user_id?: string | null
        }
        Relationships: []
      }
      property_media: {
        Row: {
          alt_text: string | null
          created_at: string
          display_order: number | null
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          is_primary: boolean | null
          media_type: string
          property_id: string
          uploaded_by: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          display_order?: number | null
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          is_primary?: boolean | null
          media_type: string
          property_id: string
          uploaded_by: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          display_order?: number | null
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          is_primary?: boolean | null
          media_type?: string
          property_id?: string
          uploaded_by?: string
        }
        Relationships: []
      }
      property_recommendations: {
        Row: {
          algorithm_version: string | null
          created_at: string | null
          id: string
          property_id: string | null
          recommendation_reasons: Json | null
          recommendation_score: number | null
          user_id: string | null
        }
        Insert: {
          algorithm_version?: string | null
          created_at?: string | null
          id?: string
          property_id?: string | null
          recommendation_reasons?: Json | null
          recommendation_score?: number | null
          user_id?: string | null
        }
        Update: {
          algorithm_version?: string | null
          created_at?: string | null
          id?: string
          property_id?: string | null
          recommendation_reasons?: Json | null
          recommendation_score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_recommendations_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_views: {
        Row: {
          id: string
          property_id: string | null
          source: string | null
          user_id: string | null
          view_duration: number | null
          viewed_at: string | null
        }
        Insert: {
          id?: string
          property_id?: string | null
          source?: string | null
          user_id?: string | null
          view_duration?: number | null
          viewed_at?: string | null
        }
        Update: {
          id?: string
          property_id?: string | null
          source?: string | null
          user_id?: string | null
          view_duration?: number | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_views_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          attempt_number: number
          completed_at: string | null
          created_at: string
          id: string
          module_id: string
          passed: boolean
          percentage: number
          questions_data: Json
          score: number
          started_at: string
          total_questions: number
          user_answers: Json
          user_id: string
        }
        Insert: {
          attempt_number?: number
          completed_at?: string | null
          created_at?: string
          id?: string
          module_id: string
          passed?: boolean
          percentage: number
          questions_data: Json
          score: number
          started_at?: string
          total_questions: number
          user_answers: Json
          user_id: string
        }
        Update: {
          attempt_number?: number
          completed_at?: string | null
          created_at?: string
          id?: string
          module_id?: string
          passed?: boolean
          percentage?: number
          questions_data?: Json
          score?: number
          started_at?: string
          total_questions?: number
          user_answers?: Json
          user_id?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          correct_answer: string
          created_at: string
          explanation: string | null
          id: string
          module_id: string
          options: Json | null
          question_order: number | null
          question_text: string
          question_type: string
          updated_at: string
        }
        Insert: {
          correct_answer: string
          created_at?: string
          explanation?: string | null
          id?: string
          module_id: string
          options?: Json | null
          question_order?: number | null
          question_text: string
          question_type?: string
          updated_at?: string
        }
        Update: {
          correct_answer?: string
          created_at?: string
          explanation?: string | null
          id?: string
          module_id?: string
          options?: Json | null
          question_order?: number | null
          question_text?: string
          question_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      saved_searches: {
        Row: {
          alert_frequency: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          search_criteria: Json
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          alert_frequency?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          search_criteria: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          alert_frequency?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          search_criteria?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      social_accounts: {
        Row: {
          access_token: string | null
          account_name: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          platform: string
          refresh_token: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          account_name: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          platform: string
          refresh_token?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          account_name?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          platform?: string
          refresh_token?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          generations_limit: number | null
          generations_used: number | null
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          generations_limit?: number | null
          generations_used?: number | null
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          generations_limit?: number | null
          generations_used?: number | null
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          email: string
          id: string
          status: string | null
          subscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          status?: string | null
          subscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          status?: string | null
          subscribed_at?: string | null
        }
        Relationships: []
      }
      system_notifications: {
        Row: {
          created_at: string | null
          created_by: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          message: string
          notification_type: string
          priority: string | null
          start_date: string | null
          target_audience: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          message: string
          notification_type: string
          priority?: string | null
          start_date?: string | null
          target_audience?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          message?: string
          notification_type?: string
          priority?: string | null
          start_date?: string | null
          target_audience?: string | null
          title?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          setting_key: string
          setting_type: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          setting_key: string
          setting_type: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          setting_key?: string
          setting_type?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      training_modules: {
        Row: {
          content: string | null
          created_at: string
          created_by: string | null
          department_id: string | null
          description: string | null
          difficulty_level: string | null
          estimated_duration: number | null
          id: string
          is_active: boolean
          is_mandatory: boolean
          max_attempts: number
          quiz_pass_percentage: number
          quiz_questions_count: number
          requires_quiz: boolean
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          department_id?: string | null
          description?: string | null
          difficulty_level?: string | null
          estimated_duration?: number | null
          id?: string
          is_active?: boolean
          is_mandatory?: boolean
          max_attempts?: number
          quiz_pass_percentage?: number
          quiz_questions_count?: number
          requires_quiz?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          department_id?: string | null
          description?: string | null
          difficulty_level?: string | null
          estimated_duration?: number | null
          id?: string
          is_active?: boolean
          is_mandatory?: boolean
          max_attempts?: number
          quiz_pass_percentage?: number
          quiz_questions_count?: number
          requires_quiz?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_modules_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      training_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          module_id: string
          progress_percentage: number | null
          quiz_attempts: number
          quiz_completed: boolean
          quiz_passed: boolean
          quiz_score: number | null
          score: number | null
          started_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          module_id: string
          progress_percentage?: number | null
          quiz_attempts?: number
          quiz_completed?: boolean
          quiz_passed?: boolean
          quiz_score?: number | null
          score?: number | null
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          module_id?: string
          progress_percentage?: number | null
          quiz_attempts?: number
          quiz_completed?: boolean
          quiz_passed?: boolean
          quiz_score?: number | null
          score?: number | null
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      training_submodules: {
        Row: {
          content: string | null
          created_at: string | null
          estimated_duration: number | null
          id: string
          is_required: boolean | null
          module_id: string
          sub_module_order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          estimated_duration?: number | null
          id?: string
          is_required?: boolean | null
          module_id: string
          sub_module_order?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          estimated_duration?: number | null
          id?: string
          is_required?: boolean | null
          module_id?: string
          sub_module_order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_submodules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity: {
        Row: {
          activity_data: Json | null
          activity_type: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          referrer: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          activity_data?: Json | null
          activity_type: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          activity_data?: Json | null
          activity_type?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string | null
          id: string
          property_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      webhook_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          updated_at: string
          user_id: string
          webhook_type: string
          webhook_url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          updated_at?: string
          user_id: string
          webhook_type: string
          webhook_url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          updated_at?: string
          user_id?: string
          webhook_type?: string
          webhook_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      employee_documents: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          document_type: Database["public"]["Enums"]["document_type"] | null
          employee_email: string | null
          employee_id: string | null
          employee_name: string | null
          file_path: string | null
          file_size: number | null
          file_type: string | null
          id: string | null
          is_training_material: boolean | null
          tags: string[] | null
          title: string | null
          training_module_title: string | null
          training_record_id: string | null
          training_status: string | null
          updated_at: string | null
          uploaded_by: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_training_record_id_fkey"
            columns: ["training_record_id"]
            isOneToOne: false
            referencedRelation: "training_progress"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      create_notification: {
        Args: {
          p_action_url?: string
          p_message: string
          p_metadata?: Json
          p_priority?: string
          p_title: string
          p_type: string
          p_user_id: string
        }
        Returns: string
      }
      get_current_user_email: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "hr" | "manager" | "employee"
      document_type:
        | "general"
        | "employee_record"
        | "training_certificate"
        | "performance_review"
        | "policy_acknowledgment"
        | "training_material"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "hr", "manager", "employee"],
      document_type: [
        "general",
        "employee_record",
        "training_certificate",
        "performance_review",
        "policy_acknowledgment",
        "training_material",
      ],
    },
  },
} as const
