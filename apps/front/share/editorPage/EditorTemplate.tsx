'use client'
import React from 'react'

const EditorTemplate: React.FC = () => {
  return (
    <div id="playerUI">
      <div id="player"></div>
      <div id="overlay" className="overlay text-light bg-dark">
        <div id="overlayHeader">
          <div id="qualityStatus" className="greyStatus">
            &#9679
          </div>
          <div id="overlayButton">+</div>
        </div>
        <div id="overlaySettings">
          <div id="showFPS" className="setting">
            <div className="settings-text">Show FPS</div>
            <label className="btn-overlay">
              <input
                type="button"
                id="show-fps-button"
                className="overlay-button btn-flat"
                value="Toggle"
              />
            </label>
          </div>
          <div id="fillWindow" className="setting">
            <div className="settings-text">Enlarge display to fill window</div>
            <label className="tgl-switch">
              <input
                type="checkbox"
                id="enlarge-display-to-fill-window-tgl"
                className="tgl tgl-flat"
                checked
              />
              <div className="tgl-slider"></div>
            </label>
          </div>
          <div id="qualityControlOwnership" className="setting">
            <div className="settings-text">Is quality controller?</div>
            <label className="tgl-switch">
              <input
                type="checkbox"
                id="quality-control-ownership-tgl"
                className="tgl tgl-flat"
              />
              <div className="tgl-slider"></div>
            </label>
          </div>
          <div id="matchViewportResolution" className="setting">
            <div className="settings-text">Match viewport resolution</div>
            <label className="tgl-switch">
              <input
                type="checkbox"
                id="match-viewport-res-tgl"
                className="tgl tgl-flat"
              />
              <div className="tgl-slider"></div>
            </label>
          </div>
          <div id="preferSFU" className="setting">
            <div className="settings-text">Prefer SFU</div>
            <label className="tgl-switch">
              <input
                type="checkbox"
                id="prefer-sfu-tgl"
                className="tgl tgl-flat"
              />
              <div className="tgl-slider"></div>
            </label>
          </div>
          <div id="useMic" className="setting">
            <div className="settings-text">Use microphone</div>
            <label className="tgl-switch">
              <input
                type="checkbox"
                id="use-mic-tgl"
                className="tgl tgl-flat"
              />
              <div className="tgl-slider"></div>
            </label>
          </div>
          <div id="forceMonoAudio" className="setting">
            <div className="settings-text">Force mono audio</div>
            <label className="tgl-switch">
              <input
                type="checkbox"
                id="force-mono-tgl"
                className="tgl tgl-flat"
              />
              <div className="tgl-slider"></div>
            </label>
          </div>
          <div id="forceTURN" className="setting">
            <div className="settings-text">Force TURN</div>
            <label className="tgl-switch">
              <input
                type="checkbox"
                id="force-turn-tgl"
                className="tgl tgl-flat"
              />
              <div className="tgl-slider"></div>
            </label>
          </div>

          <div id="encoderSettings">
            <div id="encoderSettingsHeader" className="settings-text">
              <div>Encoder Settings</div>
            </div>
            <div id="encoderParamsContainer" className="collapse" />
            <div className="form-group">
              <label htmlFor="encoder-min-qp-text">Min QP</label>
              <input
                type="number"
                className="form-control"
                id="encoder-min-qp-text"
                value="0"
                min="0"
                max="51"
              />
              <label htmlFor="encoder-max-qp-text">Max QP</label>
              <input
                type="number"
                className="form-control"
                id="encoder-max-qp-text"
                value="51"
                min="0"
                max="51"
              />
              <br />
              <input
                id="encoder-params-submit"
                className="overlay-button btn-flat"
                type="button"
                value="Apply"
              />
            </div>
          </div>
        </div>

        <section id="webRTCSettings">
          <div id="webRTCSettingsHeader" className="settings-text">
            <div>WebRTC Settings</div>
          </div>
          <div id="webrtcParamsContainer" className="collapse">
            <div className="form-group">
              <label htmlFor="webrtc-fps-text">FPS</label>
              <input
                type="number"
                className="form-control"
                id="webrtc-fps-text"
                value="60"
                min="1"
                max="999"
              />
              <label htmlFor="webrtc-min-bitrate-text">
                Min bitrate (kbps)
              </label>
              <input
                type="number"
                className="form-control"
                id="webrtc-min-bitrate-text"
                value="0"
                min="0"
                max="100000"
              />
              <label htmlFor="webrtc-max-bitrate-text">
                Max bitrate (kbps)
              </label>
              <input
                type="number"
                className="form-control"
                id="webrtc-max-bitrate-text"
                value="0"
                min="0"
                max="100000"
              />
              <br />
              <input
                id="webrtc-params-submit"
                className="overlay-button btn-flat"
                type="button"
                value="Apply"
              />
            </div>
          </div>
        </section>

        <section id="streamSettings">
          <div id="streamSettingsHeader" className="settings-text">
            <div>Stream Settings</div>
          </div>
          <div id="streamSettingsContainer" className="collapse">
            <div className="form-group">
              <div className="settings-text">Player stream</div>
              <select className="form-control" id="stream-select"></select>
              <div className="settings-text">Player track</div>
              <select className="form-control" id="track-select"></select>
            </div>
          </div>
        </section>
        <br />

        <section id="statsPanel">
          <div className="setting settings-text">
            <div>Show Stats</div>
            <label className="tgl-switch">
              <input
                type="checkbox"
                id="show-stats-tgl"
                className="tgl tgl-flat"
                checked
              />
              <div className="tgl-slider"></div>
            </label>
          </div>
          <div id="statsContainer" className="statsContainer">
            <div id="stats" className="stats"></div>
          </div>
        </section>

        <section id="latencyTest">
          <div className="setting settings-text">
            <div>Latency Report</div>
            <label className="btn-overlay">
              <input
                type="button"
                id="test-latency-button"
                className="overlay-button btn-flat"
                value="Get Report"
              />
            </label>
          </div>
          <div id="latencyStatsContainer" className="statsContainer">
            <div id="LatencyStats" className="stats">
              No report yet...
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default EditorTemplate
