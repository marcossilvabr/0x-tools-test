/*
 * -----------------------------------------------------------------------------
 * Warning: This file is auto-generated by contracts-gen. Don't edit manually.
 * -----------------------------------------------------------------------------
 */
import { ContractArtifact } from 'ethereum-types';

import * as EthVault from '../generated-artifacts/EthVault.json';
import * as IEthVault from '../generated-artifacts/IEthVault.json';
import * as IStaking from '../generated-artifacts/IStaking.json';
import * as IStakingEvents from '../generated-artifacts/IStakingEvents.json';
import * as IStakingPoolRewardVault from '../generated-artifacts/IStakingPoolRewardVault.json';
import * as IStakingProxy from '../generated-artifacts/IStakingProxy.json';
import * as IStorage from '../generated-artifacts/IStorage.json';
import * as IStorageInit from '../generated-artifacts/IStorageInit.json';
import * as IStructs from '../generated-artifacts/IStructs.json';
import * as IVaultCore from '../generated-artifacts/IVaultCore.json';
import * as IZrxVault from '../generated-artifacts/IZrxVault.json';
import * as LibCobbDouglas from '../generated-artifacts/LibCobbDouglas.json';
import * as LibFixedMath from '../generated-artifacts/LibFixedMath.json';
import * as LibFixedMathRichErrors from '../generated-artifacts/LibFixedMathRichErrors.json';
import * as LibProxy from '../generated-artifacts/LibProxy.json';
import * as LibSafeDowncast from '../generated-artifacts/LibSafeDowncast.json';
import * as LibStakingRichErrors from '../generated-artifacts/LibStakingRichErrors.json';
import * as MixinConstants from '../generated-artifacts/MixinConstants.json';
import * as MixinCumulativeRewards from '../generated-artifacts/MixinCumulativeRewards.json';
import * as MixinDeploymentConstants from '../generated-artifacts/MixinDeploymentConstants.json';
import * as MixinExchangeFees from '../generated-artifacts/MixinExchangeFees.json';
import * as MixinExchangeManager from '../generated-artifacts/MixinExchangeManager.json';
import * as MixinParams from '../generated-artifacts/MixinParams.json';
import * as MixinScheduler from '../generated-artifacts/MixinScheduler.json';
import * as MixinStake from '../generated-artifacts/MixinStake.json';
import * as MixinStakeBalances from '../generated-artifacts/MixinStakeBalances.json';
import * as MixinStakeStorage from '../generated-artifacts/MixinStakeStorage.json';
import * as MixinStakingPool from '../generated-artifacts/MixinStakingPool.json';
import * as MixinStakingPoolMakers from '../generated-artifacts/MixinStakingPoolMakers.json';
import * as MixinStakingPoolModifiers from '../generated-artifacts/MixinStakingPoolModifiers.json';
import * as MixinStakingPoolRewards from '../generated-artifacts/MixinStakingPoolRewards.json';
import * as MixinStorage from '../generated-artifacts/MixinStorage.json';
import * as MixinVaultCore from '../generated-artifacts/MixinVaultCore.json';
import * as ReadOnlyProxy from '../generated-artifacts/ReadOnlyProxy.json';
import * as Staking from '../generated-artifacts/Staking.json';
import * as StakingPoolRewardVault from '../generated-artifacts/StakingPoolRewardVault.json';
import * as StakingProxy from '../generated-artifacts/StakingProxy.json';
import * as TestCobbDouglas from '../generated-artifacts/TestCobbDouglas.json';
import * as TestCumulativeRewardTracking from '../generated-artifacts/TestCumulativeRewardTracking.json';
import * as TestInitTarget from '../generated-artifacts/TestInitTarget.json';
import * as TestLibFixedMath from '../generated-artifacts/TestLibFixedMath.json';
import * as TestLibProxy from '../generated-artifacts/TestLibProxy.json';
import * as TestLibProxyReceiver from '../generated-artifacts/TestLibProxyReceiver.json';
import * as TestLibSafeDowncast from '../generated-artifacts/TestLibSafeDowncast.json';
import * as TestMixinVaultCore from '../generated-artifacts/TestMixinVaultCore.json';
import * as TestProtocolFees from '../generated-artifacts/TestProtocolFees.json';
import * as TestProtocolFeesERC20Proxy from '../generated-artifacts/TestProtocolFeesERC20Proxy.json';
import * as TestStaking from '../generated-artifacts/TestStaking.json';
import * as TestStakingProxy from '../generated-artifacts/TestStakingProxy.json';
import * as TestStorageLayout from '../generated-artifacts/TestStorageLayout.json';
import * as ZrxVault from '../generated-artifacts/ZrxVault.json';
export const artifacts = {
    ReadOnlyProxy: ReadOnlyProxy as ContractArtifact,
    Staking: Staking as ContractArtifact,
    StakingProxy: StakingProxy as ContractArtifact,
    MixinExchangeFees: MixinExchangeFees as ContractArtifact,
    MixinExchangeManager: MixinExchangeManager as ContractArtifact,
    MixinConstants: MixinConstants as ContractArtifact,
    MixinDeploymentConstants: MixinDeploymentConstants as ContractArtifact,
    MixinStorage: MixinStorage as ContractArtifact,
    IEthVault: IEthVault as ContractArtifact,
    IStaking: IStaking as ContractArtifact,
    IStakingEvents: IStakingEvents as ContractArtifact,
    IStakingPoolRewardVault: IStakingPoolRewardVault as ContractArtifact,
    IStakingProxy: IStakingProxy as ContractArtifact,
    IStorage: IStorage as ContractArtifact,
    IStorageInit: IStorageInit as ContractArtifact,
    IStructs: IStructs as ContractArtifact,
    IVaultCore: IVaultCore as ContractArtifact,
    IZrxVault: IZrxVault as ContractArtifact,
    LibCobbDouglas: LibCobbDouglas as ContractArtifact,
    LibFixedMath: LibFixedMath as ContractArtifact,
    LibFixedMathRichErrors: LibFixedMathRichErrors as ContractArtifact,
    LibProxy: LibProxy as ContractArtifact,
    LibSafeDowncast: LibSafeDowncast as ContractArtifact,
    LibStakingRichErrors: LibStakingRichErrors as ContractArtifact,
    MixinStake: MixinStake as ContractArtifact,
    MixinStakeBalances: MixinStakeBalances as ContractArtifact,
    MixinStakeStorage: MixinStakeStorage as ContractArtifact,
    MixinCumulativeRewards: MixinCumulativeRewards as ContractArtifact,
    MixinStakingPool: MixinStakingPool as ContractArtifact,
    MixinStakingPoolMakers: MixinStakingPoolMakers as ContractArtifact,
    MixinStakingPoolModifiers: MixinStakingPoolModifiers as ContractArtifact,
    MixinStakingPoolRewards: MixinStakingPoolRewards as ContractArtifact,
    MixinParams: MixinParams as ContractArtifact,
    MixinScheduler: MixinScheduler as ContractArtifact,
    EthVault: EthVault as ContractArtifact,
    MixinVaultCore: MixinVaultCore as ContractArtifact,
    StakingPoolRewardVault: StakingPoolRewardVault as ContractArtifact,
    ZrxVault: ZrxVault as ContractArtifact,
    TestCobbDouglas: TestCobbDouglas as ContractArtifact,
    TestCumulativeRewardTracking: TestCumulativeRewardTracking as ContractArtifact,
    TestInitTarget: TestInitTarget as ContractArtifact,
    TestLibFixedMath: TestLibFixedMath as ContractArtifact,
    TestLibProxy: TestLibProxy as ContractArtifact,
    TestLibProxyReceiver: TestLibProxyReceiver as ContractArtifact,
    TestLibSafeDowncast: TestLibSafeDowncast as ContractArtifact,
    TestMixinVaultCore: TestMixinVaultCore as ContractArtifact,
    TestProtocolFees: TestProtocolFees as ContractArtifact,
    TestProtocolFeesERC20Proxy: TestProtocolFeesERC20Proxy as ContractArtifact,
    TestStaking: TestStaking as ContractArtifact,
    TestStakingProxy: TestStakingProxy as ContractArtifact,
    TestStorageLayout: TestStorageLayout as ContractArtifact,
};
