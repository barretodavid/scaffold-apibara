#[starknet::interface]
pub trait ICounter<TContractState> {
    fn get_counter(self: @TContractState) -> u32;
    fn increase_counter(ref self: TContractState);
    fn decrease_counter(ref self: TContractState);
    fn reset_counter(ref self: TContractState);
}

#[starknet::contract]
pub mod CounterContract {
    use super::ICounter;
    use openzeppelin_access::ownable::OwnableComponent;
    use starknet::{ContractAddress, get_caller_address};
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    // Ownable Mixin
    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl InternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        counter: u32,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        CounterIncreased: CounterIncreased,
        CounterDecreased: CounterDecreased,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
    }

    #[derive(Drop, starknet::Event)]
    pub struct CounterIncreased {
        pub address: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    pub struct CounterDecreased {
        pub address: ContractAddress,
    }

    pub mod Errors {
        pub const NEGATIVE_COUNTER: felt252 = 'Counter can\'t be negative';
    }

    #[constructor]
    fn constructor(ref self: ContractState, init_value: u32, owner: ContractAddress) {
        self.counter.write(init_value);
        self.ownable.initializer(owner);
    }

    #[abi(embed_v0)]
    impl CounterImpl of ICounter<ContractState> {
        fn get_counter(self: @ContractState) -> u32 {
            self.counter.read()
        }

        fn increase_counter(ref self: ContractState) {
            let old_counter = self.counter.read();
            self.counter.write(old_counter + 1);
            self.emit(CounterIncreased { address: get_caller_address() });
        }

        fn decrease_counter(ref self: ContractState) {
            let old_counter = self.counter.read();
            assert(old_counter > 0, Errors::NEGATIVE_COUNTER);
            self.counter.write(old_counter - 1);
            self.emit(CounterDecreased { address: get_caller_address() });
        }

        fn reset_counter(ref self: ContractState) {
            self.ownable.assert_only_owner();
            self.counter.write(0);
        }
    }
}