use anchor_lang::prelude::*;

pub mod constants;
pub mod states;
pub mod instructions;
pub use instructions::*;
pub mod errors;
pub use errors::SolanceError;
pub mod events;
pub use events::*;

declare_id!("4JasCNGt4XMT7hGh86296TQXrvyJYXEhF6R4apdVLyXg");

#[program]
pub mod solance {
    use super::*;

    pub fn initialize_client_ix(ctx: Context<InitializeClient>) -> Result<()> {
        initialize_client(ctx)
    }
}
