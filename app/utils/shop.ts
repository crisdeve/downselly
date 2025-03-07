import { uid } from "./uid"

class campaign {
  public namespace = 'downsell'
  public key = 'data'
  public type = 'json'


  create (dataForm = null) {
    // ... logic to convert dataForm to JSON campaign required
    const id = uid()

    const campaignJSON = {
      id,
      type: 'new-client',
      name: `Campaign #${id}`,
      timeEvaluation: 300000,
      triggers: [{ type: 1, settings: 'setting' }],
      actions: [
        { type: 1, settings: 'settings' },
        { type: 2, settings: 'settings' }
      ],
      triggerCondition: '1||2'
    }
    
    return JSON.stringify(campaignJSON)
  }
}

export default new campaign()
