"use client"

import { useState } from "react"
import FlowDiagram from "@/components/flow-diagram"
import AiChatbot from "@/components/ai-chatbot"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRight, Code, MessageSquare } from "lucide-react"

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <ArrowLeftRight className="h-6 w-6 mr-2" />
            <h1 className="font-semibold">Solana Flow Diagram</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Connect Wallet
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className={`flex-1 overflow-auto`}>
          <FlowDiagram />
        </div>

        <div className={`border-l ${isSidebarOpen ? "w-96" : "w-0"} transition-all duration-300 overflow-hidden`}>
          {isSidebarOpen && (
            <Tabs defaultValue="assistant" className="h-full flex flex-col">
              <div className="border-b px-4">
                <TabsList className="my-2">
                  <TabsTrigger value="assistant">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    AI Assistant
                  </TabsTrigger>
                  <TabsTrigger value="code">
                    <Code className="h-4 w-4 mr-2" />
                    Program Code
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="assistant" className="flex-1 p-0 m-0 overflow-hidden">
                <AiChatbot />
              </TabsContent>

              <TabsContent value="code" className="flex-1 p-4 m-0 overflow-auto">
                <Card>
                  <CardContent className="p-4">
                    <pre className="text-sm overflow-auto">
                      <code>{`// Solana Program Example
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;

    if account.owner != program_id {
        msg!("Account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    // Process based on instruction
    match instruction_data[0] {
        0 => {
            msg!("Instruction: Initialize");
            // Initialize logic
        }
        1 => {
            msg!("Instruction: Update");
            // Update logic
        }
        2 => {
            msg!("Instruction: Transfer");
            // Transfer logic
        }
        _ => {
            msg!("Error: Unknown instruction");
            return Err(ProgramError::InvalidInstructionData);
        }
    }

    Ok(())
}`}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}

